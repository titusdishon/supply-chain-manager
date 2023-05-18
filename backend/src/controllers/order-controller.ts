import { Request, Response } from "express";
import Order from "../models/order";
import Product from "../models/product";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Product, as: "products" }], // Updated alias to "Products"
    });
    res.json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Error retrieving orders" });
  }
};

// // Get a specific order by ID
export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: [{ model: Product, as: "products" }],
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ error: "Error retrieving order" });
  }
};

// // Create a new order
export const createOrder = async (req: Request, res: Response) => {
  const {
    status,
    customerName,
    customerEmail,
    address,
    quantity,
    price,
    currency,
    productIds,
  } = req.body;

  try {
    const order = await Order.create<any>({
      status,
      customerName,
      customerEmail,
      address,
      quantity,
      price,
      currency,
    });

    if (productIds && productIds.length > 0) {
      const products = await Product.findAll({ where: { id: productIds } });
      await order.addProducts(products);
    }

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};

// Update a specific order by ID
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, productIds } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      await order.update({ status });

      // Remove existing products associated with the order
      await order.removeProducts();

      // Add the new set of products
      if (productIds && productIds.length > 0) {
        const products = await Product.findAll({ where: { id: productIds } });
        await order.addProducts(products);
      }

      res.json({ message: "Order updated successfully", order });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Error updating order" });
  }
};

// Update the progress status of an order
export const updateOrderProgress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { progress } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (order) {
      order.status = progress;
      await order.save();
      res.json({ message: "Order progress updated successfully", order });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error("Error updating order progress:", error);
    res.status(500).json({ error: "Error updating order progress" });
  }
};
