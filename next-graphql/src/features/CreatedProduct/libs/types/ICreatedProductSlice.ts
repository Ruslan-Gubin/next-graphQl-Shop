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
  category: string;
  name: string;
  price: number;
  oldPrice: number;
  count: number;
  description: string;
}

interface ICreatedProductSlice {
  departmentMenu: IOptionDepartment;
  subdepartmentMenu: Ioption;
  categoriesMenu: Ioption;
  additationalOption: IAdditationalOption;
  additationSize: IAdditationSize;
  basicValue: IBasicValue;
}

export type { ICreatedProductSlice };
