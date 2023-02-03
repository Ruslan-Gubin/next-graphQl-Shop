interface IImages {
  url: string;
  public_id: string;
}

const checkImagesValidator = ( images: (string | IImages)[],textErrors: string): string => {
  if (images.length <= 0) {
    return textErrors;
  } else {
    return "";
  }
};

export { checkImagesValidator };
