import { Router, Request, Response, NextFunction } from "express";
import * as controllers from "./OrdersController";
import { RequestValidator as validator } from "./validators/validators";
import { query, body } from "express-validator";
export const orderRouter = Router();

//CRUD
// CREATE - READ - UPDATE - DELETE

orderRouter.get("/:id", controllers.getOrderByIdController);
orderRouter.post(
  "/",
  // body("name").isString().notEmpty(),
  // body("description").isString().optional(),
  // body("picture").isURL().optional(),
  // body("price").isNumeric().notEmpty(),
  // validator,
  controllers.createOrderController
);

orderRouter.put(
  "/:id",
  // body("id").isString().notEmpty(),
  // body("name").isString().notEmpty(),
  // body("description").isString().optional(),
  // body("picture").isURL().optional(),
  // body("price").isNumeric().notEmpty(),
  validator,
  controllers.updateOrderStatusController
);

orderRouter.put(
  "/:orderId/add/product/:productId",
  // body("id").isString().notEmpty(),
  // body("name").isString().notEmpty(),
  // body("description").isString().optional(),
  // body("picture").isURL().optional(),
  // body("price").isNumeric().notEmpty(),
  validator,
  controllers.addProductToOrderController
);
