import express from "express";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesByUsahaId,
  getCategoryById,
  updateCategory,
} from "../controllers/CategoryController.js";

const router = express.Router();

router.get("/categories/all", verifyUser, getCategories);
router.get("/categories/usahaId", getCategoriesByUsahaId);
router.get("/categories/:id", getCategoryById);
router.post("/categories/add", verifyUser, createCategory);
router.patch("/categories/update/:id", verifyUser, updateCategory);
router.delete("/categories/delete/:id", verifyUser, deleteCategory);

export default router;
