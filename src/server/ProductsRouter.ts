import { Router, Request, Response, NextFunction } from "express";
import * as controllers from "./ProductsController";
import { RequestValidator as validator } from "./validators/validators";
import { query, body } from "express-validator";
import { authMiddleware } from "./middlewares/authMiddleware";
export const productRouter = Router();

productRouter.get("/", controllers.getStockController); // libre
productRouter.get("/name/:name", controllers.getProductByNameController); // libre
productRouter.get("/:id", controllers.getProductByIdController); // libre

productRouter.use(authMiddleware) // MIDDLEWARE DE LOGIN

productRouter.post(
  "/",
  body("name").isString().notEmpty(),
  body("description").isString().optional(),
  body("picture").isURL().optional(),
  body("price").isNumeric().notEmpty(),
  validator,
  controllers.createProductController
); // logueado
productRouter.put(
  "/:id",
  body("id").isString().notEmpty(),
  body("name").isString().notEmpty(),
  body("description").isString().optional(),
  body("picture").isURL().optional(),
  body("price").isNumeric().notEmpty(),
  validator,
  controllers.updateProductController
); //logueado
productRouter.delete("/:id", controllers.deleteProductController); // logueado
