import { Ioption } from "../../../../apps/constants/optionsMenu";

interface ICatalogPage {
  href: string;
  value: string;
  optionDepartment: Ioption[];
  label: string;
  department: string;
  sub_department: string;
  sub_departmentName:string;
  categoryOptions: { value: string; label: string; id: string }[]
  brandOptions: { value: string; label: string; id: string }[]
}

export type { ICatalogPage }