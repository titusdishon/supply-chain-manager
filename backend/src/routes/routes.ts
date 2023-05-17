import express from "express";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controllers";

const Router = express.Router();

Router.post("/products", createProduct);

Router.get("/products/:id", getProductById);

Router.get("/products", getAllProducts);

Router.put("/products/:id", updateProduct);

Router.delete("/products/:id", deleteProduct);

export default Router;
