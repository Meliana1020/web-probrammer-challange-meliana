import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.json({
    message: `Selamat datang di dashboard, ${req.user.email}!`,
  });
});

export default router;
