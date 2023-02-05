import { graphql, GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { cloudinaryImagesMethod } from "../../utils/cloudinaryImagesMethod.js";
import { helperSchema } from "../../utils/helperSchema.js";
import { PhotoProductModel } from "./models.js";
import { PhotoProductType } from './types.js';


const photoProductMutation = {
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
  // addCommentDialog: {
  //   type: QuestionType,
  //   args: {
  //     id: { type: new GraphQLNonNull(GraphQLID) },
  //     text: { type: new GraphQLNonNull(GraphQLString) },
  //     name: { type: new GraphQLNonNull(GraphQLString) },
  //     viewed: { type: new GraphQLNonNull(GraphQLBoolean) },
  //   },
  //   async resolve(parent, args) {
  //     const name = args.name ? args.name : 'Guest'
  //     const dialog = { text: args.text, name, time: formatedDate() };
  //     return await QuestionModel.findByIdAndUpdate(
  //       args.id,
  //       { $push: { dialog: dialog }, viewed: args.viewed },
  //       { returnDocument: "after" }
  //     );
  //   },
  // },
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
