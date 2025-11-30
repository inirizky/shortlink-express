import express from "express";
import {
  Me,
  userLogin,
  userLogout,
  userRegister,
} from "../controller/user.controller.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/me", authenticateToken, Me);
router.post("/logout", authenticateToken, userLogout);

export default router;
