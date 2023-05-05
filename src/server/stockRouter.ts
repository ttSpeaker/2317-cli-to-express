import { Router } from "express";
import * as controllers from "./controllers";

export const stockRouter = Router();

//CRUD 
// CREATE - READ - UPDATE - DELETE
stockRouter.get("/", controllers.getStockController);
stockRouter.get("/:id", controllers.getStockItemController);

stockRouter.post("/", controllers.createStockItemController);
stockRouter.put("/:id", controllers.updateStockItemController);
stockRouter.delete("/:id", controllers.deleteStockItemController);

// otras funcionalidades.. sumar items sumar precios.. 

stockRouter.put("/:id/quantity-change", controllers.itemQuantityChangeController)