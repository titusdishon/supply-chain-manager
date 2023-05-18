import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderProgress,
  updateOrder,
} from "../controllers/order-controller";
import { authenticate } from "../utils/auth-middlewares";

const orderRouter = express.Router();

orderRouter.get("/", authenticate, getAllOrders);

orderRouter.get("/:id", authenticate, getOrderById);
orderRouter.put("/:id", authenticate, updateOrder);

orderRouter.post("/", authenticate, createOrder);

orderRouter.put("/orders-progress/:id", authenticate, updateOrderProgress);

export default orderRouter;
