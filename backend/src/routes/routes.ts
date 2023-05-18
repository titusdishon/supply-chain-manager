import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderProgress,
  updateOrder,
} from "../controllers/order-controller";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controllers";

const router = express.Router();

router.get("/orders", getAllOrders);

router.get("/orders/:id", getOrderById);
router.put("/orders/:id", updateOrder);

router.post("/orders/", createOrder);

router.put("/orders-progress/:id", updateOrderProgress);

router.post("/products", createProduct);

router.get("/products/:id", getProductById);

router.get("/products", getAllProducts);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
