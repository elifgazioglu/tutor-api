import Tutor from "../models/tutorApplication.model.js";
import nodemailer from "nodemailer";

export const tutorApplication = async (req, res, next) => {
  try {
    const { name, lastName, email, phone, educationLevel, desc, resume } =
      req.body;

    const newTutor = new Tutor({
      email,
      name,
      lastName,
      phone,
      educationLevel,
      desc,
      resume,
    });

    const savedTutor = await newTutor.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "elifgazioglu0@gmail.com",
        pass: "lvkvemcqnjbaxaat",
      },
    });

    const mailOptions = {
      from: "elifgazioglu0@gmail.com",
      to: "elifh.gazioglu@gmail.com",
      subject: "Yeni Bir Eğitimci Kaydı",
      text: "Bir eğitimci kaydı oluşturuldu.",
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json(savedTutor);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const tutorRegister = async (req, res, next) => {
  
  
};
