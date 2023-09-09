import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import {
  createCategoryUsaha,
  deleteCategoryUsaha,
  getCategoriesUsaha,
  getCategoryUsahaById,
  updateCategoryUsaha,
} from "../controllers/CategoryUsahaController.js";

const router = express.Router();

router.get("/categoryUsaha/all", verifyUser, getCategoriesUsaha);
router.get("/categoryUsaha/:id", verifyUser, getCategoryUsahaById);
router.post("/categoryUsaha/add", verifyUser, createCategoryUsaha);
router.patch("/categoryUsaha/update/:id", verifyUser, updateCategoryUsaha);
router.delete("/categoryUsaha/delete/:id", verifyUser, deleteCategoryUsaha);

export default router;
