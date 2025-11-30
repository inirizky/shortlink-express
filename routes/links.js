import express from "express";
import {
  createLinks,
  deleteLink,
  editLink,
  readLinkBySlug,
  readLinks,
} from "../controller/links.controller.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
router.post("/new", authenticateToken, createLinks);
router.put("/:id", authenticateToken, editLink);
router.delete("/:id", authenticateToken, deleteLink);
router.get("/:slug", authenticateToken, readLinkBySlug);
router.get("/", authenticateToken, readLinks);

export default router;
