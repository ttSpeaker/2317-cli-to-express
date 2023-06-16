import { Product } from "./types/Product";
import { prisma } from "../repository/prisma";

export async function updateProduct(id: string, product: Product) {
  try {
    if (id !== product.id) {
      throw new Error("Id cant be different for product");
    }
    const db = prisma();
    const udpatedProduct = await db.products.update({
      data: {
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        pictures: product.picture,
      },
      where: {
        id: id,
      },
    });

    return udpatedProduct;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
