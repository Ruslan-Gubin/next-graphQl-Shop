interface DialogType {
  __typename: string;
  name: string;
  text: string;
  time: string;
}

interface IDialogQuestion {
  viewed: boolean;
  __typename: string;
  _id: string;
  dialog: DialogType[];
}

export type { IDialogQuestion };

