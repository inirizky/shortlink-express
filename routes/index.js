// src/route/index.js
import express from "express";
import UserRoute from "./user.js";
import LinkRoute from "./links.js";

const router = express.Router();

router.use("/users", UserRoute);
router.use("/links", LinkRoute);

export default router;
