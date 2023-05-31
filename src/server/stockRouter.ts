import { Router, Request, Response, NextFunction } from "express";
import * as controllers from "./controllers";
import { createItemValidator as validator } from "./validators/validators";
import { query, body } from "express-validator";
export const productRouter = Router();

//CRUD
// CREATE - READ - UPDATE - DELETE
productRouter.get("/", controllers.getStockController);
productRouter.get("/name/:name", controllers.getProductByNameController);

productRouter.get("/:id", controllers.getProductByIdController);
productRouter.post(
  "/",
  body("name").isString().notEmpty(),
  body("description").isString().optional(),
  body("picture").isURL().optional(),
  body("price").isNumeric().notEmpty(),
  validator,
  controllers.createProductController
);
productRouter.put(
  "/:id",
  body("id").isString().notEmpty(),
  body("name").isString().notEmpty(),
  body("description").isString().optional(),
  body("picture").isURL().optional(),
  body("price").isNumeric().notEmpty(),
  validator,
  controllers.updateProductController
);

productRouter.delete("/:id", controllers.deleteProductController);
