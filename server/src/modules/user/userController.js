import expressAsyncHandler from "express-async-handler";
import User from "./userModel.js";
import { AppError } from "../../utils/appError.js";
// Create a new user
export const createUser = expressAsyncHandler(async (req, res, next) => {
  const { name, countryCode, phone, fullPhone, interest } = req.body;

  if (!name || !countryCode || !phone || !fullPhone || !interest) {
    return next(new AppError(400, "All fields are required"));
  }

  const newUser = await User.create({
    name,
    countryCode,
    phone,
    fullPhone,
    interest,
  });
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

// Get all users
export const getAllUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

// Get a user by ID
export const getUserById = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Update a user by ID
export const updateUserById = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Delete a user by ID
export const deleteUserById = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
