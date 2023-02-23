import { IProductType } from "@/apps/types";
import { IBasketProduct } from "@/features/Basket/libs/types/IBasketSlice";


const checkFavorite = (favorites:IBasketProduct[], product: IProductType) => {
  const item = favorites.find((item) => item.id === product._id);
  if (item) {
    return true;
  } else {
    return false;
  }
};

export {checkFavorite}