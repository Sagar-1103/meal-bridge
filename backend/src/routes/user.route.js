import { Router } from "express";
import { businessSignup, loginUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/login",loginUser);

router.route("/business-signup",businessSignup);

export default router;