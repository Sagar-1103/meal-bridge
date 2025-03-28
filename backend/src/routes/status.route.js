import { updateFoodStatus_to_in_progress, updateFoodStatus_to_picked_up, updateVolunteer_to_listing } from "../controllers/status.controller.js";
import { Router } from "express";

const router = Router();
router.patch("/in-progress",updateFoodStatus_to_in_progress)
router.patch('/update-volunteer',updateVolunteer_to_listing)
router.patch('/picked-up',updateFoodStatus_to_picked_up)

export default router