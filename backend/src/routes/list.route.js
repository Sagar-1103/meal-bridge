import { Router } from "express";
import { charitylist, createlist } from "../controllers/list.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create",verifyToken,createlist);
router.get("charity",charitylist)

export default router;