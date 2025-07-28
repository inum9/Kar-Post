import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Post } from "../model/post.model.js";


const  schedulePost =asyncHandler(async (req,res)=>{
const { content, publishAt } = req.body;
if(!content||!publishAt)
{
    throw new ApiError(401,"user need to fill all the data  ");
}
const post=await Post.create({
    content,
    publishAt: new Date(publishAt),
    owner:req.user._id
});
if(!post)
{
    throw new ApiError(401," error in creating the post");
}

return res.status(200).json(new ApiResponse(200,post,"post has been created to  automate  !!"));
});
export {schedulePost};