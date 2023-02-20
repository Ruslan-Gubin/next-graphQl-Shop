import { createContext, useContext } from "react";
import { IBasketContext } from "../types/IBasketContext";

const BasketContext = createContext<IBasketContext | null>(null)

const useBasketContext = () => {
  const context = useContext(BasketContext)

  if (!context) {
    throw new Error('Can not useBasketContext outside of the BasketContext')
  }

  return context

}

export { useBasketContext, BasketContext }
