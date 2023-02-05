interface IImages {
  url: string;
  public_id: string;
}

interface IOptionsBodyUpdate {
  remainsImages?: (string | IImages)[];
  imageRemovesUpdate: string[];
  imageAddUpdate: string[];
}

interface IinitialCreatedImages {
  images: (string | IImages)[];
  updatedStatus: boolean;
  optionsBodyUpdate: IOptionsBodyUpdate;
  error: { images: string };
}

export type { IImages, IOptionsBodyUpdate, IinitialCreatedImages };
