import jwt from "jsonwebtoken";

export const createToken = (payload, res) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.cookie("jwt", token, {
        httpOnly: true, // prevent client-side JS access (XSS attacks)
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return token;
}

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}