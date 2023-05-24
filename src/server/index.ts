import express from "express";
import { stockRouter } from "./stockRouter";
import {createPrismaClient} from "./prisma"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "HOLA" });
});

app.use("/api/stock/", stockRouter);

app.listen(PORT, () => {
  createPrismaClient()
  console.log("Server running on port 3000");
});
