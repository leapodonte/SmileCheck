import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors'

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Initialize app
bootstrap(app);
dbConnection();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'SmileCheck Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SmileCheck Backend listening on port ${PORT}!`));
