import { products } from "@prisma/client";
import { prisma } from "../repository/prisma";
import { Order } from "./types/Order";

export async function updateOrderStatus(
  id: string,
  status: string
): Promise<Order> {
  const db = prisma();
  const updatedOrder = await db.orders.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },

    include: { products: true },
  });
  //   const getOrder = await db.orders.findFirst({ include: { products: true } });

  const order: Order = {
    id: updatedOrder.id,
    status: updatedOrder.status,
    products: updatedOrder.products,
    createdAt: updatedOrder.created_at,
    updatedAt: updatedOrder.updated_at,
  };
  return order;
}

export async function addProductToOrder(
  orderId: string,
  productId: string
): Promise<any> {
  const db = prisma();
  const prod = await db.products.update({
    where: {
      id: productId,
    },
    data: {
      orderId: orderId,
    },

    include: { order: true },
  });
  //   const getOrder = await db.orders.findFirst({ include: { products: true } });

  return prod;
}
