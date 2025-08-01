import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import axios from "axios";
import { generatePostContent } from "../utils/Ai.util.js";

// 1. Controller to build the LinkedIn auth URL and redirect the user
const redirectToLinkdin = asyncHandler(async (req, res) => {
  try {
    const scope = "openid profile w_member_social";
    const redirectUri = "http://localhost:8000/api/v1/linkedin/callback"; // FIX 1: Corrected spelling
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${
      process.env.LINKEDIN_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`; // FIX 2: Corrected .env variable name

    return res.redirect(authUrl);
  } catch (error) {
    console.log(`error in redirecting  error is  ${error}`);
  }
});

const handleLinkedInCallback = asyncHandler(async (req, res) => {
    try {
        const { code } = req.query;
        const userId = req.user._id;

        if (!userId) {
            throw new ApiError(401, "userId is not found!");
        }
        if (!code) {
            throw new ApiError(400, "LinkedIn authorization code not found.");
        }

        // Step 1: Exchange code for access token (This part is correct in your code)
        const tokenResponse = await axios.post(
            "https://www.linkedin.com/oauth/v2/accessToken",
            null,
            {
                params: {
                    grant_type: "authorization_code",
                    code: code,
                    client_id: process.env.LINKEDIN_CLIENT_ID,
                    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
                    redirect_uri: "http://localhost:8000/api/v1/linkedin/callback",
                },
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );

        const accessToken = tokenResponse.data.access_token;
        
        // ✅ START: THIS IS THE MISSING PART
        // Step 2: Use the access token to get the user's LinkedIn ID
        const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const linkedinUserId = profileResponse.data.sub; 
        // ✅ END: THIS IS THE MISSING PART

        // Step 3: Save BOTH the token and the ID to the user's record
        req.user.linkedinAccessToken = accessToken;
        req.user.linkedinId = linkedinUserId; // Save the newly fetched ID
        await req.user.save({ validateBeforeSave: false });

        res.status(200).json(new ApiResponse(200, {}, "Successfully connected LinkedIn account and saved user ID!"));

    } catch (error) {
        console.error("THE REAL ERROR FROM LINKEDIN IS:", error.response?.data);
        throw new ApiError(500, "Failed to connect LinkedIn account.");
    }
});
const createLinkdinPost= asyncHandler (async(req,res)=>{
     const { content } = req.body;
    const user = req.user;
       if (!content) {
        throw new ApiError(400, "Content is required to make a post.");
    }

    // Check if the user has connected their LinkedIn account
    if (!user.linkedinAccessToken || !user.linkedinId) {
        throw new ApiError(400, "LinkedIn account is not connected. Please connect your account first.");
    }

       const postBody = {
        author: `urn:li:person:${user.linkedinId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: content
                },
                shareMediaCategory: 'NONE'
            }
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
    };try {
        // Make the API call to LinkedIn's UGC (User Generated Content) Posts API
        await axios.post('https://api.linkedin.com/v2/ugcPosts', postBody, {
            headers: {
                'Authorization': `Bearer ${user.linkedinAccessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0' // Required header for this API
            }
        });

      return   res.status(200).json(new ApiResponse(200, {}, "Post was successfully published on LinkedIn!"));

    } catch (error) {
        console.error("Error posting to LinkedIn:", error.response?.data || error.message);
        throw new ApiError(500, "Failed to publish post on LinkedIn.");
    }

});
const genrateAndPost= asyncHandler(async (req,res)=>{
            const { topic } = req.body;
    const user = req.user;
    if(!topic)
    {
        throw new ApiError(401,"topic is not found !!");
    }
     // --- 1. Call the AI service to generate content ---
    const generatedPost= await generatePostContent();
    if (!generatedPost) {
        throw new ApiError(500, "AI failed to generate content.");
    }
    // --- 2. Post to LinkedIn ---
    if (!user.linkedinAccessToken || !user.linkedinId) {
        throw new ApiError(400, "LinkedIn account is not connected.");
    }
           const postBody = {
        author: `urn:li:person:${user.linkedinId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: { text: generatedPost },
                shareMediaCategory: 'NONE'
            }
        },
        visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
    };
      await axios.post('https://api.linkedin.com/v2/ugcPosts', postBody, {
        headers: {
            'Authorization': `Bearer ${user.linkedinAccessToken}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0'
        }
    });
       return res.status(200).json(
        new ApiResponse(
            200, 
            { generatedContent }, 
            "Post was generated by AI and successfully published on LinkedIn!"
        )
    );



});

export { redirectToLinkdin, handleLinkedInCallback ,createLinkdinPost ,genrateAndPost};

