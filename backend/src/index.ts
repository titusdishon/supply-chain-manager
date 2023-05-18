import express, { Request, Response, NextFunction } from "express";
import connection from "./database-connection";
import orderRouter from "./routes/order-routes";
import productRouter from "./routes/product-routes";
import authRouter from "./routes/auth-routes";
import { json, urlencoded } from "body-parser";

const app = express();

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use("/orders/", orderRouter);
app.use("/products/", productRouter);
app.use("/auth/", authRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
