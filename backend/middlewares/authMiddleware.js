import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import 'dotenv/config'

async function authMiddleware(req, res, next) {
  try {
    // Check if auth_token exists in cookies
    const { auth_token } = req.cookies;

    if (!auth_token) {
      return res
        .status(401)
        .json({ message: "No authentication token provided" });
    }

    // Verify the token
    const decoded_token = jwt.verify(auth_token, process.env.SECRET);

    // Find the user based on the token's userID
    const loggedInUser = await userModel.findById(decoded_token.userID);

    if (!loggedInUser) {
      return res.status(401).json({ message: "User not found" });
    }
    // Attach user information to the request object
    req.user = loggedInUser;
    next();
  } catch (err) {
    console.log(err);
    // res.status(500).json({ message: "Authentication failed", error: err.message });
  }
}

export default authMiddleware;
