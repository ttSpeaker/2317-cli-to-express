import { prisma } from "../repository/prisma";
import { Order } from "./types/Order";

export async function getOrderById(id: string, userId:string): Promise<Order | null> {
  const db = prisma();
  const findOrder = await db.orders.findMany({
    where: {
      id: id,
      userId: userId
    },
    include: { products: true },
  });

  if (!findOrder || findOrder.length > 0 ) {
    return null;
  }

  // MAPEAR
  // mapeo de una entidad a otra o de un tipo a otro que es similar 
  const order: Order = {
    id: findOrder[0].id,
    status: findOrder[0].status,
    products: findOrder[0].products,
    createdAt: findOrder[0].created_at,
    updatedAt: findOrder[0].updated_at,
  };
  return order;
}
