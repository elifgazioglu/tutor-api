import User from "../models/user.model.js";
import createError from "../utils/createError.js";

//DELETE
export const deleteUser = async (req, res, next) => {
  const user = req.user;

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

//UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can update only your account!"));
    }

    const { name, lastName, phone, profilePic } = req.body;

    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (profilePic) user.profilePic = profilePic;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

//GET USER
export const getUser = async (req, res, next) => {
  res.status(200).send(req.user);
};

// GET TEACHER
export const getTeacher = async (req, res, next) => {
  try {
    const teachers = await User.find({ role: "teacher" });
    res.status(200).json(teachers);
  } catch (error) {
    next(error);
  }
};

//GET USER SLUG
export const getUserSlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const user = await User.findOne({ slug });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
