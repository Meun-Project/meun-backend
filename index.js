import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();

//koneksi ke database dengan nama database relation_learning
const mongodb = `mongodb://meundb:meundb@127.0.0.1:27017/meundb?retryWrites=true&w=majority`;
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//memanggil connection mongoose
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.on("open", () => console.log("Database connected"));

app.use(cors());
// cors({
//   credentials: true, //agar frontend dapat mengirimkan req beserta cooiki beserta menyertakan credentialnya.
//   origin: "http://localhost:3000", //agar hanya domain frontend yang bisa mengakses api dari backend
// })
app.use(express.json());
app.use(UserRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running ...");
});
