import { Request, Response } from "express";
import Order, { OrderAttributes, OrderedProduct } from "../models/order";
import Product from "../models/product";

export const createOrder = async (req: Request, res: Response) => {
  const { status, customerName, customerEmail, address, orderedProducts } =
    req.body;

  try {
    const order: OrderAttributes = {
      status,
      customerName,
      customerEmail,
      address,
      products: [],
    };

    if (orderedProducts && orderedProducts.length > 0) {
      const productIds = orderedProducts.map((product: any) => product.id);
      console.log("LEVEL----2", productIds);

      const existingProducts = await Product.findAll({
        where: { id: productIds },
      });

      for (const orderedProduct of orderedProducts) {
        const product = existingProducts.find(
          (p: any) => p.id === orderedProduct.id
        );

        if (!product) {
          return res.status(404).json({
            message: "Some products do not exist",
          });
        }

        if (product.quantity < orderedProduct.quantity) {
          return res.status(400).json({
            message: "Insufficient quantity for some products",
          });
        }

        order.products?.push({
          id: product.id,
          price: product.price,
          currency: product.currency,
          imageUrl: product.imageUrl,
          quantity: orderedProduct.quantity,
          productName: product.productName,
          batchNumber: product.batchNumber,
        });

        product.quantity -= orderedProduct.quantity;
        await product.save();
      }
    }

    if (order.products?.length) {
      const createdOrder = await Order.create(order);
      return res.status(201).json({
        message: "Order created successfully",
        order: createdOrder,
      });
    } else {
      return res.status(404).json({
        message: "No valid products specified",
      });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};

// Update an order by ID
export const updateOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const {
    status,
    customerName,
    customerEmail,
    address,
    product: orderedProducts,
  } = req.body;

  try {
    // Find the order by ID
    const order = await Order.findByPk(orderId);
    const tempProducts: OrderedProduct[] = [];
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Update the order attributes
    order.status = status;
    order.customerName = customerName;
    order.customerEmail = customerEmail;
    order.address = address;

    if (orderedProducts && orderedProducts.length > 0) {
      const existingProducts = order.products;
      if (existingProducts) {
        existingProducts.forEach((product: any) => {
          const orderedProduct = orderedProducts.find(
            (p: any) => p.id === product.id
          );

          if (orderedProduct) {
            tempProducts.push({
              id: product.id,
              price: product.price,
              currency: product.currency,
              imageUrl: product.imageUrl,
              quantity: orderedProduct.quantity,
              productName: product.productName,
              batchNumber: product.batchNumber,
            });
          }
        });
      }
    }
    order.products = tempProducts;
    // Save the updated order
    const updatedOrder = await order.save();

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Error updating order" });
  }
};

// Get all orders
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();

    res.json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Error getting orders" });
  }
};

// Get a single order by ID
export const getOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ error: "Error getting order" });
  }
};

export const updateOrderProgress = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const { progress } = req.body;

  try {
    // Find the order by ID
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Update the progress
    order.status = progress;

    // Save the updated order
    const updatedOrder = await order.save();

    res.status(200).json({
      message: "Order progress updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order progress:", error);
    res.status(500).json({ error: "Error updating order progress" });
  }
};
