import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized request");
    }

    const channelId = new mongoose.Types.ObjectId(userId);

    // Get stats: total views, total videos, total likes
    const videoStats = await Video.aggregate([
        {
            $match: {
                owner: channelId
            }
        },
        {
            // Lookup likes on videos uploaded by this channel
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "likes"
            }
        },
        {
            $project: {
                views: 1,
                likesCount: { $size: "$likes" }
            }
        },
        {
            $group: {
                _id: null,
                totalVideos: { $sum: 1 },
                totalViews: { $sum: "$views" },
                totalLikes: { $sum: "$likesCount" }
            }
        }
    ]);

    // Get total subscribers count
    const totalSubscribers = await Subscription.countDocuments({
        channel: channelId
    });

    const stats = {
        totalVideos: videoStats[0]?.totalVideos || 0,
        totalViews: videoStats[0]?.totalViews || 0,
        totalLikes: videoStats[0]?.totalLikes || 0,
        totalSubscribers: totalSubscribers
    };

    return res
        .status(200)
        .json(new ApiResponse(200, stats, "Channel stats fetched successfully"));
});

const getChannelVideos = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "Unauthorized request");
    }

    const channelId = new mongoose.Types.ObjectId(userId);

    // Get all the videos uploaded by the channel
    const videos = await Video.find({ owner: channelId }).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
});

export {
    getChannelStats, 
    getChannelVideos
}