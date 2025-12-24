import dotenv from "dotenv";

dotenv.config();

const ENV = {
    "PORT": process.env.PORT,
    "MONGO_URI": process.env.MONGO_URI,
    "JWT_SECRET": process.env.JWT_SECRET,
    "JWT_EXPIRES_IN": process.env.JWT_EXPIRES_IN,
    "RESEND_EMAIL_API_KEY": process.env.RESEND_EMAIL_API_KEY,
    "EMAIL_FROM_NAME": process.env.EMAIL_FROM_NAME,
    "EMAIL_FROM": process.env.EMAIL_FROM,
    "CLIENT_URL": process.env.CLIENT_URL,
    "CLOUDINARY_API_SECRET": process.env.CLOUDINARY_API_SECRET,
    "CLOUDINARY_API_KEY": process.env.CLOUDINARY_API_KEY,
    "CLOUDINARY_NAME": process.env.CLOUDINARY_NAME,
    "ARCJET_ENV": process.env.ARCJET_ENV,
    "ARCJET_KEY": process.env.ARCJET_KEY,
    "NODE_ENV": process.env.NODE_ENV
}

export default ENV;