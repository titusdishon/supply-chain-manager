import { Sequelize } from "sequelize";
import { createApp } from "./app";
import connection from "./database-connection";

async function startApp() {
  const db: Sequelize = connection;
  await createApp(db, 8000);
}

startApp().catch((error) => {
  console.error("Error starting the application:", error);
});
