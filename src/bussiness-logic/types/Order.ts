import { Product } from "./Product";

export type Order = {
  id: string;
  status: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
};
