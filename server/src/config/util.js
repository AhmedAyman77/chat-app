import jwt from "jsonwebtoken";
import ENV from "./env.js";

export const createToken = (payload, res) => {
    const token = jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN });

    res.cookie("jwt", token, {
        httpOnly: true, // prevent client-side JS access (XSS attacks)
        secure: ENV.NODE_ENV === "production",
        sameSite: "strict", // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/"
    });

    return token;
}