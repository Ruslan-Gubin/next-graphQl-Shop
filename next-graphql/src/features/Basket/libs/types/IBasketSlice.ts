interface IBasketProduct {
  img: string;
  name: string;
  count: number;
  color: string;
  price: number;
  oldPrice: number;
  id: string;
  brandName: string;
  department: string;
  sub_department: string;
}


interface IBasketSlice {
  basket: IBasketProduct[];
}

export type { IBasketSlice, IBasketProduct };
