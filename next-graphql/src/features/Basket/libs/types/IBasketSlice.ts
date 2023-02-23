interface IBasketProduct {
  img: string;
  name: string;
  count: number;
  color: string;
  price: number;
  oldPrice: number;
  id: string;
  brandName: string
}
interface IAddress {
  street: string;
  flat: string;
  privateHome: boolean;
  entrance: string;
  intercom: string;
  floor: string;
  selected?: boolean;
  id?: string;
}

interface IBasketSlice {
  basket: IBasketProduct[];
  favorites: IBasketProduct[];
  address: IAddress[];
}

export type { IBasketSlice, IBasketProduct, IAddress };
