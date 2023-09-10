import express from "express";
import { register, login, logout, getEmail} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/email/:email", getEmail );

export default router;