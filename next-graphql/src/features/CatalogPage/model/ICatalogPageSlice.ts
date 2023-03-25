type IPropertyType = { name: string; value: number };

interface IOption {
  value: string;
  label: string;
  id: string;
}

interface ICatalogPageSlice {
  productCount: number;
  page: number;
  perPage: number;
  totalLength: number;
  selected: {
    sort: { value: string; label: string; property: IPropertyType };
    subDepartmen: { value: string; label: string };
    category: IOption;
    brand: IOption;
    price: { minPrice: number; maxPrice: number };
  };
  optionsArr: {
    sort: { value: string; label: string; property: IPropertyType }[];
    brand: IOption[];
  };
}

export type { ICatalogPageSlice, IPropertyType };
