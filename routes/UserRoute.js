import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users/all", verifyUser, adminOnly, getUsers);
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.post("/users/add", createUser);
router.patch("/users/update/:id", verifyUser, updateUser);
router.delete("/users/delete/:id", verifyUser, deleteUser);

export default router;
