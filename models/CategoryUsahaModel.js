import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const categoryUsahaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  usahaId: [
    {
      type: ObjectId,
      ref: "Usaha",
    },
  ],
});

export default mongoose.model("CategoryUsaha", categoryUsahaSchema);
