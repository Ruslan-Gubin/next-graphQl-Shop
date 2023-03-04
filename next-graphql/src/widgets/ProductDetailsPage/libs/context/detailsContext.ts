import { createContext, useContext } from "react"
import { IProductType } from "../../../../apps/types"

interface IProductDetails {
  refetch: () => void
  product_id: string
  product: IProductType
  similarProduct: IProductType[] 
  department: {name: string, href: string}
  subDepartment: {name: string, href: string}
  media: {isDesktop: boolean | undefined, isMobile: boolean | undefined, isTablet: boolean | undefined}
}

export const DetailsContext = createContext<IProductDetails | null>(null)

export const useDetailsContext = () => {
  const data = useContext(DetailsContext)
  if (!data) {
    throw new Error('Can not useDetailsContext outside of the DetailsContext')
  }
  return data
}