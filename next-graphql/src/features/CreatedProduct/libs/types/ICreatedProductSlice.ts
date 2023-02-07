import { Ioption, IOptionDepartment } from "./IOptionsMenu";

interface IAdditationalOption extends Record<string, string> {
  appoitment: string;
  purpose: string;
  features: string;
  material: string;
  country: string;
  packaging: string;
  equipment: string;
}

interface IAdditationSize extends Record<string, string> {
  height: string;
  length: string;
  width: string;
  weight: string;
}

interface IBasicValue extends Record<string, string | number> {
  name: string;
  price: number | string;
  oldPrice: number | string;
  count: number | string;
  description: string;
}

interface ICreatedProductSlice {
  departmentMenu: IOptionDepartment;
  subdepartmentMenu: Ioption;
  categoriesMenu: { value: string; label: string; id: string | undefined };
  brandMenu: { value: string; label: string; id: string | undefined };
  additationalOption: IAdditationalOption;
  additationSize: IAdditationSize;
  basicValue: IBasicValue;
  categoryValue: string | number;
  brandValue: string | number;
  colorMenu: { value: string; label: string };
}

export type {
  ICreatedProductSlice,
  IBasicValue,
  IAdditationalOption,
  IAdditationSize,
};
