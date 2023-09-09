import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Boolean,
    default: false,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  soldQty: {
    type: Number,
    default: 0,
  },
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
});

export default mongoose.model("Menu", menuSchema);
