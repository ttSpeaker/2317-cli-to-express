import { Request, Response, NextFunction } from "express";
import {login, refreshToken, register} from "../auth-logic/auth-funcs"

export const loginController = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   try {
    const result = await login(email, password)
    res.json(result)
    return
   } catch (err) {
    res.status(500).send(err)
    return
   }
}

export const registerController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await register(email, password)
        res.json(result);
        return
       } catch (err) {
        res.status(500).send(err);
        return
       }
}

export const refreshTokenController = async (req: Request, res: Response) => {
    const header = req.headers.authorization;

    if (!header) {
      res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT PRESENT" });
      return;
    }
    const token = header.split(" ")[1];

    try{
        const result = await refreshToken(token)
        res.json(result)
        return;
    } catch (err){
        res.status(500)
        return;
    }
}