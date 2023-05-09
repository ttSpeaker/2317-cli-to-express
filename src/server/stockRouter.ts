import { Router, Request, Response, NextFunction } from "express";
import * as controllers from "./controllers";
import { createItemValidator } from "./validators/validators";
import { query, body } from "express-validator";
export const stockRouter = Router();

//CRUD
// CREATE - READ - UPDATE - DELETE
stockRouter.get("/", controllers.getStockController);
stockRouter.get("/:id", controllers.getStockItemController);

stockRouter.post(
  "/",
  body("name").isString().notEmpty(),
  body("description").isString().optional(),
  body("picture").isURL().optional(),
  body("price").isNumeric().notEmpty(),
  body("category").isArray().notEmpty(),
  body("quantity").isNumeric().notEmpty(),
  createItemValidator,
  controllers.createStockItemController
);
stockRouter.put("/:id", controllers.updateStockItemController);
stockRouter.delete("/:id", controllers.deleteStockItemController);

// otras funcionalidades.. sumar items sumar precios..

stockRouter.put(
  "/:id/quantity-change",
  controllers.itemQuantityChangeController
);
