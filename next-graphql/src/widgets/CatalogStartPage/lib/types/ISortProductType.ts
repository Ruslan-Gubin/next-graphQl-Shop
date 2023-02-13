interface ISortProductType {
  discount: string;
  name: string;
  oldPrice: number;
  price: number;
  _id: string;
  photo: {
    images: {
      url: string;
    }[];
  };
}

export type { ISortProductType };
