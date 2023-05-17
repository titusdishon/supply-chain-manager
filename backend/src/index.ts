import express from "express";
import sequelize from "./database-connection";
import Router from "./routes/routes";

const app = express();

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

app.use("/", Router);

const port = 8000;
app.listen(port, () => {
  testDatabaseConnection();
  console.log(`Server is running on http://localhost:${port}`);
});
