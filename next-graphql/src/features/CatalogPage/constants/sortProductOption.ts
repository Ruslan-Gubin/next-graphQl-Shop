import { IPropertyType } from "../model/ICatalogPageSlice";

const sortProductOption: {value: string, label: string, property: IPropertyType}[] = [
  { value: "По популярности", label: "popular", property: {name: 'views', value: 1 } },
  { value: "По рейтингу", label: "rating", property: { name: 'views', value: -1 } },
  { value: "По возростанию цены", label: "min-price", property: { name: 'price', value: 1 } },
  { value: "По убыванию цены", label: "max-price", property: {name: 'price', value: -1 } },
  { value: "По новинкам", label: "new-product", property: { name: 'createdAt', value: -1 } },
  { value: "Сначало выгодные", label: "discount", property: { name: 'discount', value: 1 } },
];

export { sortProductOption };
