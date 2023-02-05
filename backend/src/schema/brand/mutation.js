import { graphql, GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { helperSchema } from "../../utils/helperSchema.js";
import { BrandModel } from "./models.js";
import { BrandType } from './types.js';


const brandMutation = {
  createdBrend: {
    type: BrandType, 
    args: {
      brand_name: { type: new GraphQLNonNull(GraphQLString) },
      },
    
    resolve(parent, args) {
      
      const newBrand = new BrandModel({
        name: args.brand_name
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
