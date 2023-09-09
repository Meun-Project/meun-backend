import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const usahaModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  noWhatsapp: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  categoryUsahaId: {
    type: ObjectId,
    ref: "CategoryUsaha",
  },
  categoryId: [
    {
      type: ObjectId,
      ref: "Category",
    },
  ],
  userId: {
    type: ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Usaha", usahaModel);
