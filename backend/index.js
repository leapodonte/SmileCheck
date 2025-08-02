import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors'

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("uploads"));

bootstrap(app);
dbConnection();

app.listen(process.env.PORT || 4000, () => console.log(`Example app listening on port ${process.env.PORT || 4000}!`));
