import { IOptionsDropDownType, IProductType } from "@/apps/types";


const sortProductFilter = (arr: IProductType[], categoryValue:IOptionsDropDownType, brandValue: IOptionsDropDownType, priceFilter: {minPrice: number,maxPrice: number}) => {
  return arr.filter(item => {

    if (categoryValue.id?.length && brandValue.id?.length) {
      return item.category_id === categoryValue.id && item.brand_id === brandValue.id && item.price >= priceFilter.minPrice && item.price <= priceFilter.maxPrice
    } else  if (categoryValue.id?.length && brandValue.id === '') {
    return  item.category_id === categoryValue.id && item.price >= priceFilter.minPrice && item.price <= priceFilter.maxPrice
    } else if (categoryValue.id === '' && brandValue.id?.length) {
        return item.brand_id === brandValue.id && item.price >= priceFilter.minPrice && item.price <= priceFilter.maxPrice
    } else {
      return  item.price >= priceFilter.minPrice && item.price <= priceFilter.maxPrice
    }
  })
}

const sortOptionsDropDown = (arr: IProductType[]) => {
  if (!arr) {
    return [];
  }

  const result: { value: string; label: string; id: string }[] = [];

  arr.forEach((item: IProductType) => {
    const check = result.find((newArr) => newArr.id === item.category._id);
    if (!check) {
      result.push({
        value: item.category.name,
        label: item.category.name,
        id: item.category._id,
      });
    }
  });

  return result;
};

const sortOptionsBrand = (arr: IProductType[]) => {
  if (!arr) {
    return [];
  }

  const result: { value: string; label: string; id: string }[] = [];

  arr.forEach((item: IProductType) => {
    const check = result.find((newArr) => newArr.id === item.brand._id);
    if (!check) {
      result.push({
        value: item.brand.name,
        label: item.brand.name,
        id: item.brand._id,
      });
    }
  });

  return result;
};

export { sortProductFilter, sortOptionsDropDown, sortOptionsBrand };
