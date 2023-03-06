import { IProductType } from "../../../../apps/types";

interface IProductDetailsPage {
  department: { name: string; href: string };
  subDepartment: { name: string; href: string };
  similarProduct: IProductType[];
  product_id: string;
  departmentHrefName: string;
  product: IProductType;
}

export type { IProductDetailsPage };
