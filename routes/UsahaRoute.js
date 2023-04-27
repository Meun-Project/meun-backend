import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import {
  createUsaha,
  getUsaha,
  getUsahaById,
} from "../controllers/UsahaController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/usaha", verifyUser, getUsaha);
router.get("/usaha/:id", verifyUser, getUsahaById);
router.post("/usaha", verifyUser, upload, createUsaha);

export default router;
