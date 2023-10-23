import blogService from "./blogService.js";
const createBlog = async (req, res) => {
  let userData = req.user;
  const newBlog = await blogService.createBlogService(userData, req.body);
  res.status(200).json({
    status: "success",
    data: newBlog,
  });
};

const getBlogs = async (req, res) => {
  const { searchText, limit } = req.query;
  const blogs = await blogService.getBlogService(searchText, limit);

  res.status(200).json({
    status: "success",
    data: blogs,
  });
};

const getSingleBlog = async (req, res) => {
  const blogId = req.params.id;
  const blog = await blogService.getSingleBlogService(blogId);

  res.status(200).json({
    status: "success",
    data: blog,
  });
};

const likeBlog = async (req, res) => {
  const userData = req.user;
  const { id } = req.params;

  try {
    const updatedBlog = await blogService.likeBlogService(id, userData);
    res.status(200).json({
      status: "success",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const shareBlog = async (req, res) => {
  const userData = req.user;
  const { id } = req.params;
  const shareBlog = await blogService.shareBlogService(id, userData);

  res.status(200).json({
    status: "success",
    data: shareBlog,
  });
};
export default { createBlog, getBlogs, getSingleBlog, likeBlog, shareBlog };
