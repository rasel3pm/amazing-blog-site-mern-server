import BlogModel from "../blog/blogModel.js";
import UserModel from "../user/userModel.js";
const createBlogService = async (userData, blogData) => {
  if (!userData) {
    throw new Error("Unauthorized");
  }
  const newBlog = await BlogModel.create(blogData);
  const updateUser = await UserModel.findOneAndUpdate(
    { email: userData.email },
    { $push: { writtenBlogs: newBlog._id } }
  );
  return { newBlog, updateUser };
};

const getBlogService = async (searchText, limit) => {
  let query = {};

  if (searchText) {
    query.$or = [
      { title: { $regex: searchText, $options: "i" } },
      { content: { $regex: searchText, $options: "i" } },
    ];
  }

  const blogs = await BlogModel.find(query)
    .limit(limit)
    .populate("comments")
    .populate("author");

  return blogs;
};

const getSingleBlogService = async (blogId) => {
  const blog = await BlogModel.findById(blogId)
    .populate("comments")
    .populate("author")
    .exec();

  return blog;
};

const likeBlogService = async (blogId, userData) => {
  const blog = await BlogModel.findById(blogId);

  if (!blog) {
    throw new Error("Blog not found");
  }

  const emailIndex = blog.likes.findIndex(
    (like) => like.email === userData.email
  );

  if (emailIndex === -1) {
    blog.likes.push({ email: userData.email, name: userData.name });
  } else {
    blog.likes.splice(emailIndex, 1);
  }

  const updatedBlog = await blog.save();

  return updatedBlog;
};

const shareBlogService = async (blogId, userData) => {
  console.log(userData);
  const blog = await BlogModel.findById(blogId);
  if (!blog) {
    throw new Error("Blog not found");
  }

  const user = await UserModel.findOne({ email: userData.email });
  if (!user) {
    throw new Error("User not found");
  }

  blog.shares.push(user._id);
  await blog.save();

  const userUpdate = await UserModel.findOneAndUpdate(
    { email: userData.email },
    { $push: { sharedBlogs: blogId } },
    { new: true }
  );

  return { blog, userUpdate };
};
export default {
  createBlogService,
  getBlogService,
  getSingleBlogService,
  likeBlogService,
  shareBlogService,
};
