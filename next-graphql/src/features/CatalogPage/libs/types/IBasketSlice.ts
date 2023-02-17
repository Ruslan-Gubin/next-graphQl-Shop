import { IProductType } from "@/apps/types";

interface IBasketProduct {
  img: string;
  name: string;
  count: number;
  color: string;
  price: number;
  oldPrice: number;
  id: string
}

interface IBasketSlice {
  basket: IBasketProduct[];
}

export type { IBasketSlice, IBasketProduct };
