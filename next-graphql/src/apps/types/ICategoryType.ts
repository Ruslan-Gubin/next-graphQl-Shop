interface ICategoryType {
  name: string;
  department: string;
  sub_department: string;
  products: string[];
  image: {url: string}
  brands: string[];
  _id: string;
  __typename: string;
}

export type { ICategoryType };
