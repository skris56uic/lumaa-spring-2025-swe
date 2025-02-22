import express from "express";
import bodyParser from "body-parser";
import db from "./models";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

db.sequelize
  .sync()
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database:", error);
  });

export default app;
