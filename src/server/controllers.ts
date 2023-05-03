import { Request, Response, NextFunction } from "express";
import { createUser } from "../bussiness-logic/createUser";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userInput = req.body;
    const result = await createUser(userInput);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
