import express from "express";
import { addTutorInformation } from "../controllers/tutor.controller.js";

const router = express.Router();
import { verifyToken } from "../middleware/jwt.js";

router.post("/add", verifyToken, addTutorInformation);

export default router;