import { updateFoodStatus_to_in_progress } from "../controllers/status.controller.js";
import { Router } from "express";

const router = Router();
router.patch("/in-progress/:listID",updateFoodStatus_to_in_progress)

export default router