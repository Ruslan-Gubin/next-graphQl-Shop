import { Dispatch, SetStateAction } from "react";
import { IAddress, IBasketProduct } from "./IBasketSlice";
import { IUser } from "../../../../apps/types";

interface IBasketContext {
  setModalActive: Dispatch<SetStateAction<boolean>>
  modalActive: boolean
  setNoContentActive: Dispatch<SetStateAction<boolean>>
}

export type { IBasketContext };
