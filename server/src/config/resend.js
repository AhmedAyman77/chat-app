import { Resend } from "resend";
import ENV from "./env.js";

console.log("Resend API Key:", ENV.RESEND_EMAIL_API_KEY); // Debugging line
export const resend = new Resend(ENV.RESEND_EMAIL_API_KEY);

export const sender = {
    name: ENV.EMAIL_FROM_NAME,
    email: ENV.EMAIL_FROM
}