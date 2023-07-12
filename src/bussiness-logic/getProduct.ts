import { prisma } from "../repository/prisma";
import { Product } from "./types/Product";
type filterInput = {dateRange?:{start:Date,end:Date}, category?: string}
export async function getProduct(userId?:string, filterInput:filterInput = {}): Promise<Product[]> {
  try {
    try {
      // input inicial
      // genero fecha para ese input
      
      const filter: any = {
        userId: userId
       }

      if(filterInput.dateRange){
        filter.created_at = { gte: filterInput.dateRange.start, lt:filterInput.dateRange.end }
      }
      
      if(filterInput.category){
        filter.category = filterInput.category
      }
      const db = prisma();
      
      const products = await db.products.findMany({
        where: filter,
        
      });
    
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
