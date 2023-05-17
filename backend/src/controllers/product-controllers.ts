import { Request, RequestHandler, Response } from "express";
import Product from "../models/product";

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ message: "get all products ", data: products });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving products" });
  }
};

// Get a single product by ID
export const getProductById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: "Error retrieving product" });
  }
};

// Create a new product
export const createProduct: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { productName, quantity, imageUrl, batchNumber } = req.body;

  try {
    const product = await Product.create<any>({
      productName,
      quantity,
      imageUrl,
      batchNumber,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
};
// Update a product by ID
export const updateProduct: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const productId = req.params.id;
  const { productName, quantity, imageUrl, batchNumber } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (product) {
      product.productName = productName;
      product.quantity = quantity;
      product.imageUrl = imageUrl;
      product.batchNumber = batchNumber;

      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete a product by ID
export const deleteProduct: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (product) {
      await product.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};
