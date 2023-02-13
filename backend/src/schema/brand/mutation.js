import {  GraphQLNonNull, GraphQLString } from "graphql";
import { cloudinaryImagesMethod } from "../../utils/cloudinaryImagesMethod.js";
import { helperSchema } from "../../utils/helperSchema.js";
import { BrandModel } from "./models.js";
import { BrandType } from './types.js';


const brandMutation = {
  createdBrend: {
    type: BrandType, 
    args: {
      brand_name: { type: new GraphQLNonNull(GraphQLString) },
      imag: { type: new GraphQLNonNull( GraphQLString) },
      },
    
   async resolve(parent, args) {
      const newImage = await cloudinaryImagesMethod(args.imag, "Brand image");
     
      const newBrand = new BrandModel({
        name: args.brand_name,
        image: newImage,
      }).save();
      return newBrand;
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

const BrandMutation = helperSchema.assingObj(brandMutation);

export { BrandMutation };
