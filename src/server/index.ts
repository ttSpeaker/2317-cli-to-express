import express from "express";
import { stockRouter } from "./stockRouter";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api/stock/", stockRouter);

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
