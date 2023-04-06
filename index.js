import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import UsahaRoute from "./routes/UsahaRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import mongoose from "mongoose";
import session from "express-session";
import { default as connectMongoDBSession} from 'connect-mongodb-session';

dotenv.config();

const app = express();
const MongoDBStore = connectMongoDBSession(session);

//koneksi ke database dengan nama database relation_learning
const mongodb = `mongodb://meundb:meundb@127.0.0.1:27017/meundb?retryWrites=true&w=majority`;
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
    secret: "secretpass",
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
// cors({
//   credentials: true, //agar frontend dapat mengirimkan req beserta cooiki beserta menyertakan credentialnya.
//   origin: "http://localhost:3000", //agar hanya domain frontend yang bisa mengakses api dari backend
// })
app.use(express.json());
app.use(UserRoute);
app.use(UsahaRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running ...");
});
