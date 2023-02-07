
  interface Ioption {
    value: string;
    label: string;
    id?: string;
  }

interface IOptionDepartment {
  value: string;
  label: string;
  subdepartment: Ioption[];
  id?: string
}

export type { Ioption, IOptionDepartment };
