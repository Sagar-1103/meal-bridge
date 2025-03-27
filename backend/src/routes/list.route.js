import { Router } from "express";
import { businesslist, charitylist, createlist } from "../controllers/list.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create",verifyToken,createlist);
router.get("/charity",charitylist)
router.get("/business",businesslist)


export default router;