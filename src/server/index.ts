import express from "express";
import { productRouter } from "./ProductsRouter";
import { orderRouter } from "./OrdersRouter";
import { createPrismaClient } from "../repository/prisma";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "HOLA" });
});

app.use("/api/products/", productRouter);
app.use("/api/orders/", orderRouter);

app.listen(PORT, () => {
  createPrismaClient();
  console.log("Server running on port 3000");
});
