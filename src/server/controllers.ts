import { Request, Response, NextFunction } from "express";
import { createStockItem } from "../bussiness-logic/createStockItem";
import { deleteStockItem } from "../bussiness-logic/deleteStock";
import { getStock, getStockItem } from "../bussiness-logic/getStock";
import {
  itemQuantityChange,
  updateStockItem,
} from "../bussiness-logic/updateStock";

export const getStockController = async (req: Request, res: Response) => {
  try {
    const result = await getStock();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getStockItemController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await getStockItem(id);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createStockItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const newItemInput = req.body;
    const result = await createStockItem(newItemInput);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStockItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const itemInput = req.body;
    const result = await updateStockItem(itemInput);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStockItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    await deleteStockItem(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const itemQuantityChangeController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const quantity = +req.body.quantity;
    const result = await itemQuantityChange(id, quantity);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
