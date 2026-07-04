import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    let {page = 1, limit = 10} = req.query

    page = parseInt(page);
    limit = parseInt(limit);

    if(!videoId){
        throw new ApiError(400,"Video Id is required")
    }

    // calculate skip
    const skip = (page -1)* limit;

    const comments = await Comment.find({ video:videoId })
    .populate("owner", "username avatar")//optional
    .sort({createdAt:-1})
    .skip(skip)
    .limit(limit);

    const totalComments = await Comment.countDocuments({ video:videoId });

    return res.status(200).json(
        new ApiResponse(200,{
            comments,
            totalComments,
            currentPage: page,
            totalPage: Math.ceil(totalComments/limit),
        }, 
        "Comments fetched successfully") 
    );
});

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { videoId } = req.params
    const { content } = req.body;

    if(!videoId){
        throw new ApiError(400,"Video Id is required")
    }

    if(!content || !content.trim() === ""){
        throw new ApiError(400,"Comment content are required")
    }

    const video = await Video.findById(videoId);
    if(!video){
        throw new ApiError(404,"Video not found")
    }

    // create comment 
    const comment = await Comment.create({
        content,
        video: videoId,
        owner:req.user?.__id,
    })

    const populateComment = await Comment.findById(comment.__id)
        .populate("owner", "username avatar");

    return res.status(201).json(
        new ApiResponse(201,populateComment,"Comment added sucessfully")
    );
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { commentId } = req.params;
    const { content } = req.body;

    // 1.Validate input
    if(!commentId){
        throw new ApiError(400,"Comment Id is required")
    }

    if(!content || !content.trim() === ""){
        throw new ApiError(400," Content cannot be empty");
    }

    // 2.Find comment
    const comment = await Comment.findById(commentId);

    if(!comment){
        throw new ApiError(404,"Comment not found")
    }

    // 3.Authorization (only owner can edit)
    if(comment.owner.toString() !== req.user?.__id.toString()){
        throw new ApiError(403,"You are not allowed to edit this comment")
    }

    // 4.Update
    comment.content = content;
    await comment.save();

     // 5. Populate owner (optional)
    const updatedComment = await Comment.findById(comment._id)
        .populate("owner", "username avatar");

    return res.status(200).json(
        new ApiResponse(200, updateComment,"Comment Update successfully")
    );

})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const { commentId } = req.params;

    // 1.Validate input
    if(!commentId){
        throw new ApiError(400,"Comment Id is required")
    }

    // 2.Find comment
    const comment = await Comment.findById(commentId);

    if(!comment){
        throw new ApiError(404,"Comment not found")
    }

    // 3.Authorization (only owner can edit)
    if(comment.owner.toString() !== req.user?.__id.toString()){
        throw new ApiError(403,"You are not allowed to delete this comment")
    }

    // 4.Update
    comment.content = content;
    await comment.deleteOne();

    return res.status(200).json(
        new ApiResponse(200,{}, "Comment deleted successfully")
    );

})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
    }