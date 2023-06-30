import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

const access_token_secret =  process.env.ACCESS_TOKEN_SECRET ?? ''

//AUTENTICACION
export const authMiddleware =  async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).json({ message: "NOT AUTHORIZED: TOKEN NOT PRESENT" });
    return;
  }
  const token = header.split(" ")[1];
  try {
    const data = jwt.verify(token, access_token_secret);
    if (data) {
        res.locals.email  = (data as any).email;
        res.locals.role = (data as any).role;
        
    next()
    return
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
}

//AUTORIZACION
export const authAdminMiddleware =  async (req: Request, res: Response, next: NextFunction) => {
    if(res.locals.role && res.locals.role === 'ADMIN'){
        next()
        return
    }
    res.status(403).json({ message: "NOT AUTHORIZED: NEED ADMIN ROLE" });
}
