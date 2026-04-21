import { Router } from 'express';
import {
    addComment ,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js"
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// Add comment
router.route("/").post(verifyJWT,addComment)

// show all comment
router.route("/video/:videoId").get(getVideoComments)

// Update comment
router.route("/:commentId").patch(verifyJWT,updateComment)

// delete comment
router.route("/:commentId").delete(verifyJWT,deleteComment)

export default router