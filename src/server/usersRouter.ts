import { Router } from "express";
import { createUserController } from "./controllers";

export const usersRouter = Router();

usersRouter.post("/", createUserController);
