import express from "express";
import { usersRouter } from "./usersRouter";

const app = express();

app.use(express.json());

app.use("/api/users/", usersRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
