import { Item } from "./types/Item";
import { get, save } from "../repository/fileMethods";
export async function updateStockItem(item: Item) {
  try {
    if (!item.id) {
      throw new Error("ID not provided");
    }
    const stock = (await get("stock")) as Item[];
    const i = stock.findIndex((stockItem) => stockItem.id === item.id);
    if (i === -1) {
      throw new Error(`Item: ${item.id} not found`);
    }
    stock[i].name = item.name;
    stock[i].description = item.description;
    stock[i].picture = item.picture;
    stock[i].price = item.price;
    stock[i].category = item.category;

    await save("stock", stock);
    return item;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function itemQuantityChange(id: string, quantity: number) {
  try {
    const stock = (await get("stock")) as Item[];
    const i = stock.findIndex((stockItem) => stockItem.id === id);
    if (i === -1) {
      throw new Error(`Item: ${id} not found`);
    }
    if (stock[i].quantity + quantity < 0) {
      throw new Error(`Item: ${id} not enough stock`);
    }
    stock[i].quantity += quantity;
    await save("stock", stock);
    return stock[i];
  } catch (err) {
    console.log(err);
    throw err;
  }
}
