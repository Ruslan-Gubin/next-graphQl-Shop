import { graphql, GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { cloudinaryImagesMethod, cloudinaryImagesRemove } from "../../utils/cloudinaryImagesMethod.js";
import { helperSchema } from "../../utils/helperSchema.js";
import { PhotoTypeScalar } from "../product/mutation.js";
import { PhotoProductModel } from "./models.js";
import { PhotoProductType } from './types.js';


export const photoProductMutation = {
  createdPhoto: {
    type: PhotoProductType,  
    args: {
      images: { type: new GraphQLList( GraphQLString) },
      },
    
  async resolve(parent, args) {
      const imageUrl = [];

      const files = args.images;

      for (const file of files) {
        const newImage = await cloudinaryImagesMethod(file, "Products GpaphQL");
        imageUrl.push(newImage);
      }
     
      const newPhotos = new PhotoProductModel({
        images: imageUrl.map((item) => item),
      }).save();
      return newPhotos;
    },
  },
  updatePhoto: {
    type: PhotoProductType,
    args: {
      photo_id: { type : new GraphQLNonNull(GraphQLID) }, 
      images_remove: { type : new GraphQLList(GraphQLString) },
      images_add: { type : new GraphQLList(GraphQLString) },
      images_old: { type: new GraphQLList(PhotoTypeScalar)},
    },
    async resolve(parent, args) {
      
      const newImagesArray = [...args.images_old]

      if (args.images_remove.length) {
     for (const imag of args.images_remove) {
      await cloudinaryImagesRemove(imag)
      }
      }

      if (args.images_add.length) {
        for (const imag of args.images_add) {
          const newImage = await cloudinaryImagesMethod(imag, "Products GpaphQL");
          newImagesArray.push(newImage);
        }
      }
     
     return await PhotoProductModel.findByIdAndUpdate(args.photo_id,
      {images: newImagesArray},
      {returnDocument: "after"}
      )

    },
  },
  // removeDialog: {
  //   type: QuestionType,
  //   args: {
  //     id: { type: new GraphQLNonNull(GraphQLID) },
  //   },
  //   async resolve(parent, args) {
  //     return await QuestionModel.findByIdAndDelete(args.id);
  //   },
  // },
};

const PhotoProductMutation = helperSchema.assingObj(photoProductMutation);

export { PhotoProductMutation };
