import dotenv from "dotenv";
import { createToken } from "../config/util.js";
import { sendWelcomeEmail } from "../email/emailHandlers.js";
import User from "../models/user.model.js";

dotenv.config();

export const register = async(req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."

            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long."

            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email is already registered."

            });
        }

        const newUser = await User.create({ fullName, email, password });

        // create Token
        createToken({ id: newUser._id }, res);

        // send welcome email
        try {
            await sendWelcomeEmail(newUser.email, newUser.fullName, process.env.CLIENT_URL);
        } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
        }

        res.status(201).json({
            message: "User registered successfully.",
            userInfo: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error. Please try again later."
        });
    }
}

export const login = (req, res) => {
    // Handle login
    res.send("Login endpoint");
}

export const logout = (req, res) => {
    // Handle logout
    res.send("Logout endpoint");
}