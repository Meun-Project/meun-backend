import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import MenuRoute from "./routes/MenuRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import CategoryUsahaRoute from "./routes/CategoryUsahaRoute.js";
import UsahaRoute from "./routes/UsahaRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";
import mongoose from "mongoose";
import session from "express-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";

dotenv.config();

const app = express();
const MongoDBStore = connectMongoDBSession(session);

//koneksi ke database dengan nama database relation_learning
const mongodb = `mongodb+srv://waidzk:kosanmin@cluster0.ag4km3f.mongodb.net/db_meun?retryWrites=true&w=majority`;
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const store = new MongoDBStore({
  uri: mongodb,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//memanggil connection mongoose
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.on("open", () => console.log("Database connected"));

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1", UserRoute);
app.use("/api/v1", UsahaRoute);
app.use("/api/v1", CategoryUsahaRoute);
app.use("/api/v1", CategoryRoute);
app.use("/api/v1", MenuRoute);
app.use("/api/v1", TransactionRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running ...");
});

export default app;
