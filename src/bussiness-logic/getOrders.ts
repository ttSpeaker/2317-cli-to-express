import { prisma } from "../repository/prisma";
import { Order } from "./types/Order";

export async function getOrderById(id: string): Promise<Order | null> {
  const db = prisma();
  const findOrder = await db.orders.findUnique({
    where: {
      id: id,
    },
    include: { products: true },
  });
  if (!findOrder) {
    return null;
  }
  const order: Order = {
    id: findOrder.id,
    status: findOrder.status,
    products: findOrder.products,
    createdAt: findOrder.created_at,
    updatedAt: findOrder.updated_at,
  };
  return order;
}
