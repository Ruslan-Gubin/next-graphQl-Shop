import { ICategoryType } from "./ICategoryType"
import { IProductType } from "./IProductType"


interface IStartPageServerProps {
  categoryData: {sortCategoryFromCatalog: ICategoryType[]}
  newProduct: {sortProductDepartment: IProductType[]}
  popularProduct: {sortProductDepartment: IProductType[]}
}

export type {IStartPageServerProps}