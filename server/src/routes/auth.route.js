import { Router } from "express";
import { login, register, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.put("/update-profile", protectRoute, updateProfile);
authRouter.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default authRouter;