import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ENV from "../config/env.js";

export const socketAuthMiddleware = async(socket, next) => {
    try { // get token from http-only cookie
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((cookie) => cookie.startsWith("jwt="))
            ?.split("=")[1];
        if (!token) {
            return next(new Error("Authentication error: No token provided"));
        }

        // verify token
        const decode = jwt.verify(token, ENV.JWT_SECRET)
        if (!decode) {
            return next(new Error("Authentication error: Invalid token"));
        }

        // fetch user from database
        const user = await User.findById(decode.userId).select("-password");
        if (!user) {
            return next(new Error("Authentication error: User not found"));
        }

        // attach user to socket object
        socket.user = user;
        socket.userId = user._id.toString();
        next();
    } catch (error) {
        next(new Error("Authentication error"));
    }
}