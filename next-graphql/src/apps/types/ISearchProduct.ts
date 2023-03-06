interface ISearchProduct {
  brand:  {__typename: string, name: string}
  category: {__typename: string, name: string}
  name: string
  photo: {__typename: string, images: {url: string}[]}
  __typename: string
  _id:  string
  department: string;
  sub_department: string;
}

export type { ISearchProduct }