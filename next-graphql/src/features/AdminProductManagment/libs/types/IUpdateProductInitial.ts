interface Ioption {
  value: string;
  label: string;
  id?: string;
}

interface IOptionDepartment {
  value: string;
  label: string;
  subdepartment: Ioption[];
  id?: string;
}

interface IUpdateProductInitial {
  departmentMenu: IOptionDepartment;
  subdepartmentMenu: Ioption;
  categoriesMenu: Ioption;
  page: number;
  perPage: number;
}

export type { IOptionDepartment, IUpdateProductInitial, Ioption };
