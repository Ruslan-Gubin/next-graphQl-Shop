import { TypeRootState } from "../../../../apps/store/srote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkImagesValidator } from "../helpers/checkImagesValidator";
import { IImages, IinitialCreatedImages } from "../types/IinitialCreatedImages";


const initialState: IinitialCreatedImages = { 
images: [],
updatedStatus: false,
optionsBodyUpdate: {
  remainsImages: [],
  imageRemovesUpdate: [],
  imageAddUpdate: [],
},
error: {
  images: "",
},
};

const createdProductImagesSlice = createSlice({
  name: "createdProductImages",
  initialState,
  reducers: {

    addImages(state, action: PayloadAction<{ img: string }>) {
      if (!state.images.includes(action.payload.img) && state.images.length < 5) {
        state.images.push(action.payload.img);
      }

      // if ( state.updatedStatus && state.optionsBodyUpdate.imageAddUpdate.length < 5 && !state.optionsBodyUpdate.imageAddUpdate.includes(action.payload.img)) {
      //   state.optionsBodyUpdate.imageAddUpdate.push(action.payload.img); /// option add image
      // }

      state.error.images = checkImagesValidator( state.images, "Добавьте минимум 1 фото");
    },

    removeImage(state,action: PayloadAction<{ arr: (IImages | string)[];item: IImages | string;}>) {
      const array = action.payload.arr;

      if (typeof action.payload.item !== "string") {
        const targetItem: IImages = action.payload.item;
        const filterImage = array.filter((item) => item !== targetItem);
        state.images = filterImage;
        state.optionsBodyUpdate.remainsImages = filterImage;

        if ( state.updatedStatus && !state.optionsBodyUpdate.imageRemovesUpdate.includes(targetItem.public_id)) {
          state.optionsBodyUpdate.imageRemovesUpdate.push(targetItem.public_id); //option remove image
        }

      } else {
        const targetString: string = action.payload.item;
        state.images = array.filter((item) => item !== targetString);

        if (state.updatedStatus && targetString) {
          state.optionsBodyUpdate.imageAddUpdate =
            state.optionsBodyUpdate.imageAddUpdate.filter((item) => item !== targetString); //option add image
        }
      }
      state.error.images = checkImagesValidator(
        state.images,
        "Добавьте минимум 1 фото"
      );
    },

    clearImages(state) {
      state.images = []
    },
   

  },
});

export const selectCreatedProductImages = (state: TypeRootState) => state.createdProductImages;

export const createdProductImagesAction = createdProductImagesSlice.actions;

export const createdProductImagesReducer = createdProductImagesSlice.reducer;