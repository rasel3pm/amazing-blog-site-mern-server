import express from "express";
import auth from "../../middleware/authentication.js";
import commentController from "./commentController.js";

const router = express.Router();

router.post(
  "/post-comment",
  auth("admin", "user"),
  commentController.postComment
);

export default router;
