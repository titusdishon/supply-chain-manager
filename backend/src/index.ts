import express, { Request, Response, NextFunction } from "express";
import sequelize from "./database-connection";
import Router from "./routes/routes";
import { json, urlencoded } from "body-parser";

const app = express();

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use("/", Router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

const port = 8000;
app.listen(port, () => {
  testDatabaseConnection();
  console.log(`Server is running on http://localhost:${port}`);
});
