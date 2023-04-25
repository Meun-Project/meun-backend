import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Boolean,
    default: false
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
});

export default mongoose.model("Menu", menuSchema);
