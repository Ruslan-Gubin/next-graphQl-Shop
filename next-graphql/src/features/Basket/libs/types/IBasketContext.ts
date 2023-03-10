import { Dispatch, SetStateAction } from "react";
import { IAddress, IBasketProduct } from "./IBasketSlice";
import { IUser } from "../../../../apps/types";

interface IBasketContext {
  handleSubmitOrders: () => void
  basket: IBasketProduct[]
  setModalActive: Dispatch<SetStateAction<boolean>>
  modalActive: boolean
  totalCount: number
  address: IAddress[];
  user: IUser
}

export type { IBasketContext };
