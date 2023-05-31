import { prisma } from "../repository/prisma";

export async function deleteStockItem(id: string) {
  try {
    const db = prisma();
    await db.products.delete({ where: { id: id } });
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
