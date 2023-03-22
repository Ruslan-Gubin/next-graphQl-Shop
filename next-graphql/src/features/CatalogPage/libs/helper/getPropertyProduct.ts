import { IProductType } from "../../../../apps/types"
import { IgetPropertyProduct } from "../types/IgetPropertyProduct"


function getPropertyProduct (product: IProductType): IgetPropertyProduct {
  const map: IgetPropertyProduct = {
    img: product.photo.images[0].url,
    name: product.name,
    count: 1,
    color: product.colors_names,
    price: product.price,
    oldPrice: product.oldPrice,
    id: product._id,
    brandName: product.brand.name,
    department: product.department,
    sub_department: product.sub_department,
  }
  return map
}

export { getPropertyProduct }