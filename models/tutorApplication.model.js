import mongoose from "mongoose";
const { Schema } = mongoose;

const tutorApplicationSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    resume: {
      type: String,
      required: true,
    },
    educationLevel: {
      type: String,
      required: true,
      enum: ["Önlisans", "Lisans", "Yüksek Lisans", "Doktora"],
      default: "Lisans",
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TutorApplication", tutorApplicationSchema);
