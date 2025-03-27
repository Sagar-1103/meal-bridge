import { Router } from "express";
import { businessSignup, charitySignup, loginUser, volunteerSignup } from "../controllers/user.controller.js";

const router = Router();

router.post("/login",loginUser);

router.post("/business-signup",businessSignup);
router.post("/charity-signup",charitySignup);
router.post("/volunteer-signup",volunteerSignup);

export default router;