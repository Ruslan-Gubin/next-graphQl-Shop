
  interface Ioption {
    value: string;
    label: string;
  }

interface IOptionDepartment {
  value: string;
  label: string;
  subdepartment?: Ioption[];
}

export type { Ioption, IOptionDepartment };
