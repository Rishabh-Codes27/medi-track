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


const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/", getAllUsers);
// router.post("/refresh-token",refreshAccessToken);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
