import express from "express";
import cors from "cors";
import "dotenv/config";

import router from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express(); // init express

app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true, // penting supaya cookies bisa dikirim
  })
); // supaya frontend bisa akses backend

app.get("/", (req, res) => {
  res.send("Hello World");
}); //

app.use(express.json()); //
app.use(cookieParser()); // Supaya bisa menerima cookies dari browser/client
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
if (app.listen(3001)) {
  console.log("App Running");
}
