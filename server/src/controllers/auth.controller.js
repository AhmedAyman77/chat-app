import User from "../models/user.model.js";
import { createToken } from "../config/util.js";

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