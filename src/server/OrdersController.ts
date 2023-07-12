import { Request, Response, NextFunction } from "express";
import { createProduct } from "../bussiness-logic/createProduct";
import { deleteStockItem as deleteProduct } from "../bussiness-logic/deleteProduct";
import {
  getProduct,
  getProductById,
  getProductByName,
} from "../bussiness-logic/getProduct";
import { updateProduct } from "../bussiness-logic/updateStock";
import { prisma } from "../repository/prisma";
import { createOrder } from "../bussiness-logic/createOrder";
import { getOrderById } from "../bussiness-logic/getOrders";
import {
  addProductToOrder,
  updateOrderStatus,
} from "../bussiness-logic/updateOrder";

export const getOrderByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = res.locals.userId
    const result = await getOrderById(id, userId);
    if (result) {
      res.json(result);
      return;
    }
    res.status(404).json({ message: `Order: ${id} not found` });
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const result = await createOrder();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await updateOrderStatus(id, body.status);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addProductToOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const orderId = req.params.orderId;
    const productId = req.params.productId;
    const result = await addProductToOrder(orderId, productId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
