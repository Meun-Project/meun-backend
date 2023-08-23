import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import {
  createUsaha,
  deleteUsaha,
  getUsaha,
  getUsahaById,
  updateUsaha,
} from "../controllers/UsahaController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/usaha/all", verifyUser, getUsaha);
router.get("/usaha/:id", verifyUser, getUsahaById);
router.post("/usaha/add", verifyUser, upload, createUsaha);
router.patch("/usaha/update/:id", verifyUser, upload, updateUsaha);
router.delete("/usaha/delete/:id", verifyUser, deleteUsaha);

export default router;
