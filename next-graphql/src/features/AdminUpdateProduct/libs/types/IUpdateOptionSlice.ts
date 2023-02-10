interface IUpdateOptionSlice {
  optionValue: { name:string, value: string | number}[]
  addImage: string[]
  updateProductStatus: boolean
  updateProductId: string
}

export type { IUpdateOptionSlice };
