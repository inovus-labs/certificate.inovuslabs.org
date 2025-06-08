
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectDB from "../config/mongo";

import routes from "./routes";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use("/", routes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`--- Server is running on PORT ${PORT}\n`);
  });
});