import express from "express";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controllers";

const productRouter = express.Router();

productRouter.post("/", createProduct);

productRouter.get("/:id", getProductById);

productRouter.get("/", getAllProducts);

productRouter.put("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter;
