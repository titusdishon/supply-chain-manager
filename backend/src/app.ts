import express, { Express, Request, Response, NextFunction } from "express";
import { Sequelize } from "sequelize";
import orderRouter from "./routes/order-routes";
import productRouter from "./routes/product-routes";
import authRouter from "./routes/auth-routes";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

export async function createApp(db: Sequelize, port: number): Promise<Express> {
  const app: Express = express();

  // Middleware
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use(cors());

  // Routes
  app.use("/orders/", orderRouter);
  app.use("/products/", productRouter);
  app.use("/auth/", authRouter);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
  });

  // Retrieve all routes
  const routes = listEndpoints(app);

  // Display all routes
  routes.forEach((route) => {
    console.log(`http://localhost:8000${route.path}`);
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
