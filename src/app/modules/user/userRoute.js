import express from "express";
import userController from "./userController.js";
import authentication from "./../../middleware/authentication.js";
const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getUser);
router.get(
  "/:id",
  authentication("user", "admin"),
  userController.getSpecificUser
);

export default router;
