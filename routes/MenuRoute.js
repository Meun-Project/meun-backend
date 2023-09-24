import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import {
  createMenu,
  deleteMenu,
  getMenu,
  getMenuById,
  updateMenu,
} from "../controllers/MenuController.js";
// import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/menu/all", verifyUser, getMenu);
router.get("/menu/:id", verifyUser, getMenuById);
router.post("/menu/add/:id", verifyUser, createMenu);
router.patch("/menu/update/:id", verifyUser, updateMenu);
router.delete("/menu/delete/:id", verifyUser, deleteMenu);

export default router;
