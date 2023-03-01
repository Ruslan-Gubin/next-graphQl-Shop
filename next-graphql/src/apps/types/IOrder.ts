import { IBasketProduct } from "../../features/Basket/libs/types/IBasketSlice";

interface IsortOrdersUser {
  _id: string;
  user_id: string;
  street: string;
  flat: string;
  floor: string;
  entrance: string;
  intercom: string;
  privateHome: boolean;
  products: IBasketProduct[];
  status: string;
  createdAt: string;
  user: {
      email:string;
      name:string;
      phone:string;
      __typename:string;
      _id:string;
  }
}

interface IOrder {
  sortOrdersUser: IsortOrdersUser[];
}

export type { IOrder, IsortOrdersUser };
