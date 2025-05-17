import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.get("/", verifyJWT, getAllUsers);
router.get("/:id", verifyJWT, getUserById);
router.put("/:id", verifyJWT, updateUser);
router.delete("/:id", verifyJWT, deleteUser);

export default router;
