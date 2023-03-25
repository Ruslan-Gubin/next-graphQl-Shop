import { createContext, useContext } from "react";
import { ICatalogProductPageContext } from "../types/ICatalogProductPageContext";


const CatalogProductPageContext = createContext<ICatalogProductPageContext | null>(null)

const useCatalogProductPageContext = () => {
  const context = useContext(CatalogProductPageContext)

  if (!context) {
    throw new Error('No context CatalogProductPageContext  in useCatalogProductPageContext')
  }

  return context
}

export { CatalogProductPageContext, useCatalogProductPageContext }