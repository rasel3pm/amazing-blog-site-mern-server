import User from "./userModel.js";
import { createToken } from "../../helper/jwtSettings.js";
const createUserService = async (userData) => {
  try {
    const existUser = await User.findOne({ email: userData.email });
    if (existUser) {
      throw new Error("Already have an account");
    }
    const newUser = await User.create(userData);
    return newUser;
  } catch (e) {
    return { status: "fail", message: "Something went wrong" };
  }
};
const loginUserService = async (loginData) => {
  const user = await User.findOne({ email: loginData.email });
  if (!user) {
    throw new Error("User does not exist");
  }
  if (user.password !== loginData.password) {
    throw new Error("Incorrect password");
  }

  const { email, role } = user;
  const accessToken = createToken(
    { email, role },
    process.env.JWT_SECRET,
    "1h"
  );

  return {
    accessToken,
  };
};
const getUsersService = async (userData, searchText) => {
  let query = {};

  if (searchText) {
    // Case-insensitive search for name or email without regex
    query.$or = [
      { name: { $regex: searchText, $options: "i" } },
      { email: { $regex: searchText, $options: "i" } },
    ];
  }

  const users = await User.find(query);
  return users;
};
const getSpecificUserService = async (userId) => {
  const user = await User.findOne({ _id: userId }).select("-password");
  return user;
};

export default {
  createUserService,
  loginUserService,
  getUsersService,
  getSpecificUserService,
};
