import { Item } from "./types/Item";
import { get } from "../repository/fileMethods";
import {prisma} from '../server/prisma'
export async function getStock(): Promise<Item[]> {
  try {
    
    const items = prisma()?.products.findMany();

    const stock = (await get("stock")) as Item[];

    return stock;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function getStockItem(itemId: string): Promise<Item> {
  try {
    const stock = (await get("stock")) as Item[];
    const item = stock.find((stockItem) => stockItem.id === itemId);
    if (item) {
        return item;
    }

    throw new Error(`Item: ${itemId} not found`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
