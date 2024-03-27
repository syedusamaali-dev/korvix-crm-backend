import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token required."));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("User not found."));
    }

    if (user.isDeleted) {
      return next(new Error("User account is inactive."));
    }

    socket.user = user;

    next();
  } catch (error) {
    next(new Error("Invalid authentication token."));
  }
};