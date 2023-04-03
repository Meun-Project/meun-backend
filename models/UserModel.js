import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
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

export default mongoose.model("User", UserSchema);
