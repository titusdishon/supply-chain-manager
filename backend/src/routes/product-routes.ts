import express from "express";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllProductsInventory,
} from "../controllers/product-controllers";
import { authenticate } from "../utils/auth-middlewares";

const productRouter = express.Router();

productRouter.post("/", authenticate, createProduct);
productRouter.get("/inventory", authenticate, getAllProductsInventory);

productRouter.get("/:id", getProductById);

productRouter.get("/", getAllProducts);

productRouter.put("/:id", authenticate, updateProduct);

productRouter.delete("/:id", authenticate, deleteProduct);

export default productRouter;
