import { ICategoryType } from "./ICategoryType";

interface IProductType {
  brand: {
    __typename: string;
    name: string;
    _id: string;
    products: IProductType[];
    image: {
      url: string
      public_id: string
    }
  };
  colors_names: string;
  description: string;
  department: string;
  sub_department: string;
  name: string;
  options: { __typename: string; name: string; value: string }[];
  photo: {
    images: { public_id: string; url: string; __typename: string }[];
    product: IProductType;
    __typename: string;
    _id: string;
  };
  category: ICategoryType;
  photo_count: number;
  brand_id: string
  category_id: string
  photo_id: string
  views: number;
  count: number;
  price: number;
  oldPrice: number;
  discount: number;
  __typename: string;
  _id: string;
}

export type { IProductType };
