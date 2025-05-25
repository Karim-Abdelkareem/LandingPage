import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    fullPhone: {
      type: String,
      required: true,
    },
    interest: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create User model
const User = mongoose.model("User", userSchema);
export default User;
