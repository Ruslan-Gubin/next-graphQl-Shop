import React from "react";
import { useDispatch } from "react-redux";

const useAddImage = (addImages: any = null) => {
  const dispatch = useDispatch();
  const [imag, setImage] = React.useState<string>("");
  const fileRef = React.useRef<HTMLInputElement>(null);

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : false;
    file && setFileToBase(file);
  };

  const setFileToBase = (file: File) => {
    try {
      const render = new FileReader();
      render.readAsDataURL(file);
      render.onloadend = () => {
        if (render.result && addImages) {
          dispatch(addImages({ img: String(render.result) }));
        } else if (render.result && !addImages) {
          setImage(String(render.result));
        }
      };
    } catch (error) {
      console.log(error, "Ошибка при загрузке файла!");
    }
  };

  const cancelImage = () => {
    setImage("");
  };

  const setImageAuth = (img: string) => {
    setImage(img);
  };

  return { fileRef, changeFile, imag, cancelImage, setImageAuth };
};

export { useAddImage };
