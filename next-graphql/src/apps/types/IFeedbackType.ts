import { IProductType } from "./IProductType";
import { IUser } from "./IUser";

interface IFeedbackType {
  _id: string;
  text: string;
  user_id: string;
  product_id: string;
  img: { url: string; publick_id: string };
  user_opinion: number;
  like: number;
  dislike: number;
  createdAt: string;
  user: IUser;
  product: IProductType
}

export type { IFeedbackType };
