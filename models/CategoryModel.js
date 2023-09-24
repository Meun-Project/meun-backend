import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  usahaId: {
    type: ObjectId,
    ref: "Usaha",
  },
  menuId: [
    {
      type: ObjectId,
      ref: "Menu",
    },
  ],
});

export default mongoose.model("Category", categorySchema);
