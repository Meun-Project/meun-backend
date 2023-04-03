import mongoose from "mongoose";

const UsahaSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    logo : {
        type: String,
        required: true,
    }
})

export default mongoose.model("Usaha", UsahaSchema);