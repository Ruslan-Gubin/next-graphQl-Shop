import { Dispatch, SetStateAction } from "react";


interface IBasketContext {
  setModalActive: Dispatch<SetStateAction<boolean>>
  modalActive: boolean
  setNoContentActive: Dispatch<SetStateAction<boolean>>
}

export type { IBasketContext };
