import { verifyToken } from "../helper/jwtSettings.js";

const authentication =
  (...roles) =>
  (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("Unauthorized");
      }
      let verified = null;
      verified = verifyToken(token, process.env.JWT_SECRET);
      req.user = verified;

      if (!roles.includes(verified.role)) {
        throw new Error("Unauthorized");
      }

      next();
    } catch (e) {
      next();
    }
  };
export default authentication;
