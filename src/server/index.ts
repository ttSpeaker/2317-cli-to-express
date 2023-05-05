import express from "express";
import { stockRouter } from "./stockRouter";

const app = express();

app.use(express.json());

app.use("/api/stock/", stockRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
