import express from "express";
import userRoute from "../modules/user/userRoute.js";
import blogRoute from "../modules/blog/blogRoute.js";
import commentRoute from "../modules/comments/commentRoute.js";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/blog",
    route: blogRoute,
  },
  {
    path: "/comment",
    route: commentRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
