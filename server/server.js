import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import { notFound, errorHandler } from "./Middleware/Errors.js";

dotenv.config();
connectDatabase();
const app = express();

app.use(express.json());

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server running in port ${PORT}...`));