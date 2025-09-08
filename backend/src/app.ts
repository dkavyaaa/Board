import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import actionItemRoutes from "./routes/actionItemRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", actionItemRoutes);

export default app;
