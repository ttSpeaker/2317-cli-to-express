import { Request, Response, NextFunction } from "express";
import { createProduct } from "../bussiness-logic/createProduct";
import { deleteStockItem as deleteProduct } from "../bussiness-logic/deleteProduct";
import {
  getProduct,
  getProductById,
  getProductByName,
} from "../bussiness-logic/getProduct";
import { updateProduct } from "../bussiness-logic/updateStock";

export const getStockController = async (req: Request, res: Response) => {
  try {
    console.log('Getting all products')
    const result = await getProduct();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await getProductById(id);
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({ message: `Product: ${id} not found` });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getProductByNameController = async (
  req: Request,
  res: Response
) => {
  try {
    const name = req.params.name;
    const result = await getProductByName(name);
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({ message: `Product: ${name} not found` });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const createProductController = async (req: Request, res: Response) => {
  try {
    const newItemInput = req.body;

    const result = await createProduct(newItemInput);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const productInput = req.body;
    const result = await updateProduct(id, productInput);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteProduct(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
