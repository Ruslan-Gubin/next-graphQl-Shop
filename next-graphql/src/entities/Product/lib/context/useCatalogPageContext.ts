import { createContext, useContext } from "react";
import { Ioption } from "../../../../apps/constants/optionsMenu";


interface ICatalogProductPageContext {
  href: string;
  value: string;
  optionDepartment: Ioption[];
  label: string;
  department: string;
  sub_department: string;
  sub_departmentName:string;
}

const CatalogProductPageContext = createContext<ICatalogProductPageContext | null>(null)

const useCatalogProductPageContext = () => {
  const context = useContext(CatalogProductPageContext)

  if (!context) {
    throw new Error('No context CatalogProductPageContext  in useCatalogProductPageContext')
  }

  return context
}

export { CatalogProductPageContext, useCatalogProductPageContext }