import { Request, RequestHandler, Response } from "express";

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "get all products " });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving products" });
  }
};

// Get a single product by ID
export const getProductById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    res.status(200).json({ message: "get product by id " });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving product" });
  }
};

// Create a new product
export const createProduct: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    res.status(201).json({ message: "created successfully " });
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};
// Update a product by ID
export const updateProduct: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    res.status(201).json({ message: "updated successfully " });
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
  try {
    res.status(204).json({ message: "deleted successfully " });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
};
