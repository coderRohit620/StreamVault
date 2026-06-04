import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const userId = req.user?._id

    const existingLike = await Like.findByIdAndDelete({
        video:videoId,
        likedBy:userId
    })

    if(existingLike){
        return res
            .status(200)
            .json(new ApiResponse(200, {liked:false}, "video unliked successfully"))
    }

    await like.create({
        video:videoId,
        likedBy:userId
    })

    return res
        .status(200)
        .json(new ApiResponse(200 , {liked:true}), "video liked successfully")
    
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid Comment ID")
    }

    const userId = req.user?._id

    const existingComment = await Comment.findByIdAndDelete({
        comment:commentId,
        likedBy:userId
    })

    if(existingComment){
        return res
            .status(200)
            .json(new ApiResponse(200, {liked:false}, "comment unliked successfully"))
    }

    await Comment.create({
        comment:commentId,
        likedBy:userId
    })

    return res
        .status(200)
        .json(new ApiResponse(200 , {liked:true}), "comment liked successfully")
  
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid Tweet ID")
    }

})

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}