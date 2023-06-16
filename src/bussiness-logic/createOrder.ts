import { prisma } from "../repository/prisma";
import { Order } from "./types/Order";

export async function createOrder(): Promise<Order> {
  const db = prisma();
  const newOrder = await db.orders.create({
    data: {},
    // include: { products: true },
  });
  //   const getOrder = await db.orders.findFirst({ include: { products: true } });

  const order: Order = {
    id: newOrder.id,
    status: newOrder.status,
    products: [],
    createdAt: newOrder.created_at,
    updatedAt: newOrder.updated_at,
  };
  return order;
}
