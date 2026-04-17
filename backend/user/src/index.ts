import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { createClient } from "redis";
import userRoutes from "./routes/user.js";
import { connectRabbitMQ } from "./controllers/rabbitmq.js";
import cors from "cors";

dotenv.config();
connectDb();
connectRabbitMQ();

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("REDIS_URL is not defined");
}
export const redisClient = createClient({
  url: redisUrl,
});

redisClient
  .connect()
  .then(() => console.log("connected to redis"))
  .catch(() => console.error);

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", userRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
