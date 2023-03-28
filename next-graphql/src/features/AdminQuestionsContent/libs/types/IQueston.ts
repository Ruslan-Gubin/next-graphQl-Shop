interface IQuestion {
  createdAt: string
  viewed: boolean
  _id: string;
  dialog: {
    time: string;
    text: string;
    name: string;
  }[];
}

export type { IQuestion };
