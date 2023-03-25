import { IProductType } from "../../../../apps/types"

interface ISelected {
  price: {minPrice: number, maxPrice: number}
  brand: {id: string}
}

const filterBrandAndPrice = (arr: IProductType[], selected: ISelected): IProductType[] => {
  const filterPrice = arr.filter(item => item.price >= selected.price.minPrice && item.price <= selected.price.maxPrice)
  
  if (selected.brand.id) {
   return filterPrice.filter(item => item.brand_id === selected.brand.id) 
  } else {
    return filterPrice
  }
}

export { filterBrandAndPrice }