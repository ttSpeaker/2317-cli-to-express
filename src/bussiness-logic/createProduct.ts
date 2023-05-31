import { Product } from "./types/Item";
import { prisma } from "../repository/prisma";
export async function createProduct(product: Product): Promise<Product> {
  try {
    const db = prisma();
    const createdProd = await db.products.create({
      data: {
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        pictures: product.picture,
      },
    });

    return createdProd;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
