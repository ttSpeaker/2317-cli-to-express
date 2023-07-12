import express from "express";
import { productRouter } from "./ProductsRouter";
import { orderRouter } from "./OrdersRouter";
import { createPrismaClient } from "../repository/prisma";
import { authRouter } from "./AuthRouter";
import { authMiddleware } from "./middlewares/authMiddleware";
import { getConfig } from "./config";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api/auth",authRouter)


app.use("/api/products/", productRouter);
app.use("/api/orders/", authMiddleware, orderRouter);


app.listen(PORT, () => {
  createPrismaClient();
  getConfig();
  console.log("Server running on port 3000");
});
