import express from "express";
import {
  deleteUser,
  getTeacher,
  getUser,
  updateUser,
  getUserSlug,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/", verifyToken, deleteUser);
router.get("/", verifyToken, getUser);
router.put("/", verifyToken, updateUser);
router.get("/teachers", getTeacher);
router.get("/:slug", getUserSlug);

export default router;
