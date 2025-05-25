import express from "express";
import * as userController from "./userController.js";
import { protect, restrictTo } from "../../middleware/authorization.js";

const router = express.Router();
// Create a new user
router.post("/", userController.createUser);
// Get all users
router.get("/", protect, restrictTo("admin"), userController.getAllUsers);
// Get a user by ID
router.get("/:id", protect, restrictTo("admin"), userController.getUserById);
// Update a user by ID
router.put("/:id", protect, restrictTo("admin"), userController.updateUserById);
// Delete a user by ID
router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  userController.deleteUserById
);

export default router;
