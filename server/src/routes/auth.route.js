import { Router } from "express";
import { login, register, logout, updateProfile } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/auth.middleware.js";
import arcjetProtection from "../middleware/archjet.middleware.js";

const authRouter = Router();

// authRouter.use(arcjetProtection);

authRouter.get("/test-arcjet", (req, res) => {
    res.send("Auth Route is working");
});
authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);

authRouter.use(protectRoute);
authRouter.put("/update-profile", updateProfile);
authRouter.get("/get-profile", (req, res) => res.status(200).json(req.user));

export default authRouter;