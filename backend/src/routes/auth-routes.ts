import express from "express";
import {
  registerUser,
  login,
  updateUser,
  getAllUsers,
  getUserById,
} from "../controllers/auth-controllers";
import { authenticate } from "../utils/auth-middlewares";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.get("/users", authenticate, getAllUsers);
authRouter.get("/users/:id", authenticate, getUserById);
authRouter.post("/login", login);
authRouter.put("/update/:id", authenticate, updateUser);

export default authRouter;
