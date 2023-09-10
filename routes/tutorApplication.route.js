import  express from "express";
import {tutorApplication} from "../controllers/tutorApplication.controller.js"

const router = express.Router();

router.post("/apply", tutorApplication);

export default router;