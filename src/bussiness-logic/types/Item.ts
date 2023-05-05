export type Item = {
  id?: string;
  name: string;
  description?: string;
  picture?: string;
  price: number;
  category: Categories[];
  quantity: number;
};

export enum Categories {
  Bebidas,
  Indumentaria,
  Juegos,
  Electronica,
  Celulares,
  Libros,
  Electrodomesticos,
}