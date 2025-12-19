import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.get("/send", sendMessage);

export default messageRouter;
5