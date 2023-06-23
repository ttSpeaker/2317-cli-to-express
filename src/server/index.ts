import express from "express";
import { productRouter } from "./ProductsRouter";
import { orderRouter } from "./OrdersRouter";
import { createPrismaClient } from "../repository/prisma";
import jwt from "jsonwebtoken";

const PORT = process.env.PORT || 3000;
const app = express();
if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error("ACCES TOKEN SECRET NOT PRESENT");
}
const secret: string = process.env.ACCESS_TOKEN_SECRET;
app.use(express.json());
app.post("/login", (req: express.Request, res: express.Response) => {
  // CHECK LOS DATOS DE LOGIN
  const { user } = req.body;
  const accessToken = jwt.sign({ user: user, role: "ADMIN" }, secret, {
    expiresIn: "1h",
  });
  res.json({ access_token: accessToken });
});

app.get("/", (req: express.Request, res: express.Response) => {
  // solo para usuarios logueados


  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT PRESENT" });
    return;
  }
  const token = header.split(" ")[1];
  try {
    const data = jwt.verify(token, secret);
    if (data) {
      const name = (data as any).user;
      const role = (data as any).role;
      if (role === "ADMIN") {
        res.json({ message: `HOLA ADMIN ${name}!` });
        return;
      }
      res.status(403).json({ message: "NOT ADMIN" });
      return;
    }
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "NOT AUTHORIZED: TOKEN EXPIRED" });
      return;
    }
    res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT VALID" });
    return;
  }

  res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT VALID" });
  return;
});

app.use("/api/products/", productRouter);
app.use("/api/orders/", orderRouter);

app.listen(PORT, () => {
  createPrismaClient();
  console.log("Server running on port 3000");
});
