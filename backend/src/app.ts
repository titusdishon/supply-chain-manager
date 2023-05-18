import express, { Express, Request, Response, NextFunction } from "express";
import { Sequelize } from "sequelize";
import orderRouter from "./routes/order-routes";
import productRouter from "./routes/product-routes";
import authRouter from "./routes/auth-routes";
import { json, urlencoded } from "body-parser";

export async function createApp(db: Sequelize, port: number): Promise<Express> {
  const app: Express = express();

  // Middleware
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // Routes
  app.use("/orders/", orderRouter);
  app.use("/products/", productRouter);
  app.use("/auth/", authRouter);

  // Error handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  });

  try {
    await db.sync();
    console.log("Database successfully connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  return app;
}
