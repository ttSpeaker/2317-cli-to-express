import { Item } from "./types/Item";
import { get, save } from "../repository/fileMethods";

export async function deleteStockItem(id: string) {
  try {
    const stock = (await get("stock")) as Item[];
    const i = stock.findIndex((stockItem) => stockItem.id === id);
    if (i === -1) {
      throw new Error(`Item: ${id} not found`);
    }
    stock.splice(i, 1);
    await save("stock", stock);
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
