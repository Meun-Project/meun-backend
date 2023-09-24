import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const { ObjectId } = mongoose.Schema;

const transactionSchema = mongoose.Schema({
  transactionId: {
    type: String,
    default: uuidv4(),
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  total_price_transaction: {
    type: Number,
    required: true,
  },
  transactions: [
    {
      product: String, // Ganti dengan tipe yang sesuai untuk produk
      price: Number, // Ganti dengan tipe yang sesuai untuk harga
      qty: Number, // Ganti dengan tipe yang sesuai untuk kuantitas
    },
  ],
  usahaId: {
    type: ObjectId,
    ref: "Usaha",
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Transaction", transactionSchema);
