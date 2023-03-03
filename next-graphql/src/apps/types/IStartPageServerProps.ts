import { ICategoryType } from "./ICategoryType"
import { IProductType } from "./IProductType"


interface IStartPageServerProps {
  categoryData:  ICategoryType[]
  newProduct:  IProductType[]
  popularProduct: IProductType[]
}

export type {IStartPageServerProps}