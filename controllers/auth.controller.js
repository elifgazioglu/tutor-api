import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import slug from "slug";

// REGISTER
export const register = async (req, res, next) => {
  try {
    const formattedName =
      req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    const formattedLastname =
      req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1);

    const hash = bcrypt.hashSync(req.body.password, 5);

    const newUser = new User({
      ...req.body,
      name: formattedName,
      lastName: formattedLastname,
      password: hash,
      slug: slug(`${formattedName}${formattedLastname}`, "-"),
    });

    await newUser.save();
    res.status(201).send("User has been created 2");
  } catch (err) {
    next(err);
  }
};

//LOGIN
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(404, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        type: user.type,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc; //password = password, the rest of the "user" information is passed to the "info"
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const getEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json({ user });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//LOGOUT
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
