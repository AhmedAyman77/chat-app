import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

export const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

export const sender = {
    name: process.env.EMAIL_FROM_NAME,
    email: process.env.EMAIL_FROM
}