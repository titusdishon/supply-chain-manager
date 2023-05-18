import express from "express";
import {
  registerUser,
  login,
  updateUser,
} from "../controllers/auth-controllers";
import { authenticate } from "../utils/auth-middlewares";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", login);
authRouter.post("/update-user", authenticate, updateUser);

export default authRouter;
