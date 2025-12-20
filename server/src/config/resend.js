import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

export const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

export const sender = {
    name: process.env.EMAIL_FROM_NAME,
    email: process.env.EMAIL_FROM
}