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

router.get("/categories/all", verifyUser, getCategories);
router.get("/categories/:id", verifyUser, getCategoryById);
router.post("/categories/add", verifyUser, createCategory);
router.patch("/categories/update/:id", verifyUser, updateCategory);
router.delete("/categories/delete/:id", verifyUser, deleteCategory);

export default router;
