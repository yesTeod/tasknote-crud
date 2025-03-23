import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import { notFound, errorHandler } from "./Middleware/Errors.js";
import cors from "cors";
import recordRouter from "./routes/records.js"

dotenv.config();
connectDatabase();
const app = express();

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use("/api/records", recordRouter);

app.use(express.json());

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server running in port ${PORT}...`));