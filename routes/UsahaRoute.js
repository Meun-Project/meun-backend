import express from "express";
import {
    getUsaha,
    getUsahaById,
    createUsaha
} from "../controllers/UsahaController.js"

const router = express.Router();

router.get('/usaha', getUsaha);
router.get('/usaha/:id', getUsahaById);
router.post('/usaha/:id', createUsaha);

export default router;