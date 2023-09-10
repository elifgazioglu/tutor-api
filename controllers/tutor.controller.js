import Tutor from "../models/tutor.model.js";

const addTutorInformation = async (req, res) => {
  const tutorData = req.body;

  try {
    const newTutor = new Tutor(tutorData);
    const savedTutor = await newTutor.save();

    res.status(201).json(savedTutor);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Eğitmen oluşturulurken bir hata oluştu.",
        error: error.message,
      });
  }
};

export { addTutorInformation };
