import { Router, Request, Response, NextFunction } from "express";
import { RequestValidator as validator } from "./validators/validators";
import { query, body, header } from "express-validator";
import * as controllers from "./AuthControllers";

export const authRouter = Router();

authRouter.post("/register", controllers.registerController);
authRouter.post("/login",controllers.loginController);
authRouter.post("/refresh",controllers.refreshTokenController);