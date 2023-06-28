import express from "express";
import { productRouter } from "./ProductsRouter";
import { orderRouter } from "./OrdersRouter";
import { createPrismaClient } from "../repository/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../repository/prisma";
import { isBreakOrContinueStatement } from "typescript";
import { users } from "@prisma/client";

const PORT = process.env.PORT || 3000;
const app = express();
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("ACCES TOKEN SECRET NOT PRESENT");
}
const access_token_secret: string = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret: string = process.env.REFRESH_TOKEN_SECRET;
app.use(express.json());
app.post("/register", async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  // validar que el email no exista!
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma().users.create({
      data: {
        email: email,
        password: hash,
      },
    });
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/login", async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  // validar email y password
  try {
    const user = await prisma().users.findUnique({ where: { email: email } });
    if (user === null) {
      res.status(404).send("User not found");
      return;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const accessToken = jwt.sign(
        { email: email, role: "ADMIN" },
        access_token_secret,
        {
          expiresIn: "1h",
        }
      );
      const refreshToken = jwt.sign({ email: email }, refresh_token_secret, {
        expiresIn: "72h",
      });
      res.json({ access_token: accessToken, refreshToken: refreshToken });
      return;
    }
    res.status(401).send("Invalid password");
    return;
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/refresh", async (req: express.Request, res: express.Response) => {

  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT PRESENT" });
    return;
  }
  const token = header.split(" ")[1];
  try {
    const data = jwt.verify(token, refresh_token_secret);
    if (data) {
      const dataparsed = data as unknown as users;

      const user = await prisma().users.findUnique({
        where: { email: dataparsed.email },
      });
      if (user === null) {
        res.send(404);
        return;
      }
      const accessToken = jwt.sign(
        { email: user.email, role: "ADMIN" },
        access_token_secret,
        {
          expiresIn: "1h",
        }
      );
      const refreshToken = jwt.sign({ email: user.email }, refresh_token_secret, {
        expiresIn: "72h",
      });
      res.json({ access_token: accessToken, refreshToken: refreshToken });
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

app.get("/", (req: express.Request, res: express.Response) => {
  // solo para usuarios logueados

  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT PRESENT" });
    return;
  }
  const token = header.split(" ")[1];
  try {
    const data = jwt.verify(token, access_token_secret);
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
