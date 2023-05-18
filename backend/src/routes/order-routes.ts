import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderProgress,
  updateOrder,
} from "../controllers/order-controller";

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);

orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);

orderRouter.post("/", createOrder);

orderRouter.put("/orders-progress/:id", updateOrderProgress);

export default orderRouter;
