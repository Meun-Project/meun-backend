import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import {
  createTransaction,
  getTransactionById,
  getTransactions,
} from "../controllers/TransactionController.js";

const router = express.Router();

router.get("/transactions", verifyUser, getTransactions);
router.get("/transaction/:id", verifyUser, getTransactionById);
router.post("/transaction/:id", verifyUser, createTransaction);

export default router;
