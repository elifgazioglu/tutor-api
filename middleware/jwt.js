import jwt from "jsonwebtoken";
import createError from "../utils/createError.js"
import User from "../models/user.model.js"

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.userId = payload.id;
    req.user = await User.findById(req.userId);
    req.type = payload.type;
    next(); // we call firstly verifyToken function, secondly deleteUser function in user.route.js/delete. that's why we have to say next(). if we don't say, an not call deleteUser
  });
};
