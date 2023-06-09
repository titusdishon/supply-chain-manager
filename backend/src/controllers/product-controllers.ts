import { Request, RequestHandler, Response } from "express";
import Product from "../models/product";
import { Op } from "sequelize";

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      where: {
        quantity: {
          [Op.gt]: 0,
        },
      },
    });
    res.status(200).json({ message: "success", data: products });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving products" });
  }
};

// Get all products
export const getAllProductsInventory = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ message: "success", data: products });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving products" });
  }
};
// Get a single product by ID
export const getProductById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  if (id === undefined) {
    return res.status(400).json({ error: "bad request" });
  }

  try {
    const product = await Product.findByPk(id);
    if (product) {
      res.status(200).json(product);
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
  const { productName, quantity, imageUrl, batchNumber, price, currency } =
    req.body;

  if (
    productName === undefined ||
    quantity === undefined ||
    imageUrl === undefined ||
    batchNumber === undefined ||
    price === undefined ||
    currency === undefined
  ) {
    return res.status(400).json({ error: "bad request" });
  }
  try {
    const product = await Product.create<any>({
      productName,
      quantity,
      imageUrl,
      batchNumber,
      price,
      currency,
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
  const { productName, quantity, imageUrl, batchNumber, price, currency } =
    req.body;

  try {
    const product = await Product.findByPk(productId);

    if (product) {
      product.productName = productName;
      product.quantity = quantity;
      product.imageUrl = imageUrl;
      product.batchNumber = batchNumber;
      product.price = price;
      product.currency = currency;

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
