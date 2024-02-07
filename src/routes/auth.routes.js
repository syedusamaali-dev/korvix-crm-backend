import express from "express";
import { register, login, getProfile ,adminDashboard} from "../controllers/auth.controller.js";
import { protect,authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getProfile);
router.get(
  "/admin",
  protect,
  authorize("admin"),
  adminDashboard
);

export default router;
