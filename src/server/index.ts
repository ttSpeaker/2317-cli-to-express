import express from "express";
import { productRouter } from "./ProductsRouter";
import { orderRouter } from "./OrdersRouter";
import { createPrismaClient } from "../repository/prisma";
import jwt from "jsonwebtoken";
import { authRouter } from "./AuthRouter";
import { authAdminMiddleware, authMiddleware } from "./middlewares/authMiddleware";

const PORT = process.env.PORT || 3000;
const app = express();
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("ACCES TOKEN SECRET NOT PRESENT");
}

app.use(express.json());

app.use("/api/auth",authRouter)



app.use("/api/products/", productRouter);
app.use("/api/orders/", authMiddleware, authAdminMiddleware, orderRouter);


app.listen(PORT, () => {
  createPrismaClient();
  console.log("Server running on port 3000");
});
