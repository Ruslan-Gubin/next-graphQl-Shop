import { IProductType } from "@/apps/types";
import { IBasketProduct } from "@/features/Basket/libs/types/IBasketSlice";


const checkBasket = (basket:IBasketProduct[], product: IProductType) => {
  const item = basket.find((item) => item.id === product._id);
  if (item) {
    return true;
  } else {
    return false;
  }
};

export { checkBasket };
