import express from "express";
import {
  registerUser,
  login,
  updateUser,
} from "../controllers/auth-controllers";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", login);
authRouter.post("/update-user", updateUser);

export default authRouter;
