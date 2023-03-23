import { createContext, useContext } from "react"
import { IProductDetailsContext } from "../types/IProductDetailsContext"


export const DetailsContext = createContext<IProductDetailsContext | null>(null)

export const useDetailsContext = () => {
  const data = useContext(DetailsContext)
  if (!data) {
    throw new Error('Can not useDetailsContext outside of the DetailsContext')
  }
  return data
}