import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import axios from "axios";


// 1. Controller to build the LinkedIn auth URL and redirect the user
const redirectToLinkdin=asyncHandler(async(req,res)=>{
  const scope = 'openid profile w_member_social';
    const redirectUri = 'http://localhost:8000/api/v1/linkdin/callback';
    
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    return res.redirect (authUrl);
    
});

    
    
    // 2. Controller to handle the callback, get the token, and save it
const handleLinkedInCallback =asyncHandler(async (req,res)=>{
            const {code}=req.query;
            if(!code)
            {
                throw new ApiError(402,"auth code is available!!")

            };
        
            const userId= req.user._id;
            if(!userId)
            {
                throw new ApiError(401,"user id is not available ");
            }
              const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
        params: {
            grant_type: 'authorization_code',
            code: code,
            client_id: process.env.LINKEDIN_CLIENT_ID,
            client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            redirect_uri: 'http://localhost:8000/api/v1/linkedin/callback'
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    if(!tokenResponse)
    {
        throw new ApiError(401,"token response is not  available");

    }
    const accessToken=await tokenResponse.data.access_token;
       req.user.linkedinAccessToken = accessToken;
    await req.user.save({ validateBeforeSave: false });
     return res.status(200).json(new ApiResponse(200,{},"data fetched successfully"));


});
export {redirectToLinkdin,handleLinkedInCallback};