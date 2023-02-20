import { Dispatch, SetStateAction } from "react";
import { IAddress, IBasketProduct } from "./IBasketSlice";

interface IBasketContext {
  basket: IBasketProduct[]
  setModalActive: Dispatch<SetStateAction<boolean>>
  modalActive: boolean
  totalCount: number
  address: IAddress[];
}

export type { IBasketContext };
