import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import tutorRoute from "./routes/tutor.route.js";
import tutorApplication from "./routes/tutorApplication.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import slugify from "slugify";
import { fileURLToPath } from "url";

const PORT = process.env.PORT;
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/resumes", express.static(path.join(__dirname, "/resumes")));

try {
  await mongoose.connect(process.env.MONGO);
  console.log("Connected to mongodb");
} catch (error) {
  console.log(error);
}

//UPLOAD IMAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//UPLOAD FILE
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "resumes");
  },
  filename: (req, file, cb) => {
    cb(null, slugify(`${Date.now()} ${file.originalname}`, { lower: true }));
  },
});

const uploadFile = multer({ storage: fileStorage });
app.post("/api/upload-file", uploadFile.single("file"), (req, res) => {
  res.status(200).json(req.file.filename);
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/tutors", tutorRoute)
app.use("/api/tutors-application", tutorApplication);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  console.log("Backend server is running " + PORT);
});
