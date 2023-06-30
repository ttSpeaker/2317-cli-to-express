import { prisma } from "../repository/prisma";
import { Product } from "./types/Product";

export async function getProduct(): Promise<Product[]> {
  try {
    try {
      const db = prisma();
      const products = await db.products.findMany();
      console.log(products)
      return products;
    } catch (err) {
      console.log(err);
      throw err;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getProductById(
  productId: string
): Promise<Product | null> {
  try {
    const db = prisma();
    const product = await db.products.findUnique({
      where: {
        id: productId,
      },
    });

    return product;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getProductByName(name: string): Promise<Product | null> {
  try {
    const db = prisma();
    const product = await db.products.findUnique({
      where: {
        name: name,
      },
      include: {
        order: true,
      },
    });

    return product;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
