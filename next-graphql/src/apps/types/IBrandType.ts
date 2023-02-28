import { IImages } from "@/features/CreatedProduct/libs/types/IinitialCreatedImages";
import { ICategoryType } from "./ICategoryType";
import { IProductType } from "./IProductType";

interface IBrandType {
  name: string;
  _id: string;
  image: IImages;
  products: IProductType[];
  category: ICategoryType[];
}

export type { IBrandType };
