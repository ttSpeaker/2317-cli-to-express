import { Item } from "./types/Item";
import { v4 as uuid } from "uuid";
import { get, save } from "../repository/fileMethods";

export async function createStockItem(item: Item): Promise<Item> {
  try {
    const stock = (await get("stock")) as Item[];

    const itemExists = stock.filter(
      (stockItem) => stockItem.name === item.name
    );
    if (itemExists.length > 0) {
      throw new Error(`Stock item ${item.name} already exists`);
    }

    item.id = uuid();

    stock.push(item);

    await save("stock", stock);
    
    return item;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
