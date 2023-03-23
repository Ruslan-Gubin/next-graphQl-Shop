import { IProductType } from "../../../../apps/types"

interface IProductDetailsContext {
  product_id: string
  product: IProductType
  similarProduct: IProductType[] 
  department: {name: string, href: string}
  subDepartment: {name: string, href: string}
  media: {isDesktop: boolean | undefined, isMobile: boolean | undefined, isTablet: boolean | undefined}
  departmentHrefName: string;
  handleAddBasket: () => void
  handleAddFavorites: () => void
  handleRemoveFavorites: () => void
}

export type { IProductDetailsContext }