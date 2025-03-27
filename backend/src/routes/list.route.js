import { Router } from "express";
import { createlist } from "../controllers/list.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create",verifyToken,createlist);

export default router;