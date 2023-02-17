type IPropertyType = { name: string; value: number };

interface ICatalogPageSlice {
  sortProduct: { value: string; label: string; property: IPropertyType };
  sizeCard: string;
  page: number;
  perPage: number;
  categoryValue: {value: string, label: string, id: string};
}

export type { ICatalogPageSlice, IPropertyType };
