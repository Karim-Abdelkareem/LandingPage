import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "./authModel.js";
export const register = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = new User({
    fullName,
    email,
    password,
    role,
  });
  await user.save();
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
