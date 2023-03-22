interface IAddress {
  street: string;
  flat: string;
  privateHome: boolean;
  entrance: string;
  intercom: string;
  floor: string;
  selected?: boolean;
  id?: string;
}


interface IAddressSlice {
  address: IAddress[];
}

export type { IAddressSlice, IAddress }