import { Router } from "express";
import { sendMessage, getAllContacts, getMessagesByUserId, getChatPartners } from "../controllers/message.controller.js";
import protectRoute from "../middleware/auth.middleware.js";
import arcjetProtection from "../middleware/archjet.middleware.js";

const messageRouter = Router();

messageRouter.use(arcjetProtection, protectRoute);

messageRouter.get("/contacts", getAllContacts);
messageRouter.get("/chats", getChatPartners);
messageRouter.get("/:id", getMessagesByUserId);
messageRouter.post("/send/:id", sendMessage);

export default messageRouter;