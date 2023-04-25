import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import {
  createMenu,
  deleteMenu,
  getMenu,
  getMenuById,
  updateMenu,
} from "../controllers/MenuController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/menu", verifyUser, getMenu);
router.get("/menu/:id", verifyUser, getMenuById);
router.post("/menu", verifyUser, upload, createMenu);
router.patch("/menu/:id", verifyUser, upload, updateMenu);
router.delete("/menu/:id", verifyUser, deleteMenu);

export default router;
