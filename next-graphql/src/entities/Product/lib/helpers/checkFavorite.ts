import { IProductType } from "../../../../apps/types";
import { IBasketProduct } from "../../../../features/Basket/libs/types/IBasketSlice";


const checkFavorite = (favorites:IBasketProduct[], product: IProductType) => {
  return  favorites.some((item) => item.id === product._id)
};

export {checkFavorite}