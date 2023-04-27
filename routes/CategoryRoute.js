import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/CategoryController.js";

const router = express.Router();

router.get("/categories", verifyUser, getCategories);
router.get("/categories/:id", verifyUser, getCategoryById);
router.post("/categories", verifyUser, createCategory);
router.patch("/categories/:id", verifyUser, updateCategory);
router.delete("/categories/:id", verifyUser, deleteCategory);

export default router;
