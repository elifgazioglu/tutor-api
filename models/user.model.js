import mongoose from "mongoose";
const { Schema } = mongoose;
import slugify from "slugify";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minglength: [6, "Please provide a password with min length 6"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "teacher"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.slug = slugify(`${this.name} ${this.lastName}`, { lower: true });
  next();
});

export default mongoose.model("User", userSchema);
