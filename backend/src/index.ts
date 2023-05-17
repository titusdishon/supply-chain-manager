import express from "express";
import sequelize from "./database";

const app = express();

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

app.get("/", (req, res) => {
  res.send("Hello,, Init project works");
});

const port = 8000;
app.listen(port, () => {
  testDatabaseConnection();
  console.log(`Server is running on http://localhost:${port}`);
});
