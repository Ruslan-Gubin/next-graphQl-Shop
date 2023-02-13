import {  GraphQLNonNull, GraphQLString } from "graphql";
import { cloudinaryImagesMethod } from "../../utils/cloudinaryImagesMethod.js";
import { helperSchema } from "../../utils/helperSchema.js";
import { CategoryModel } from "./models.js";
import { CategoryType } from './types.js';


const categoryMutation = {
  createdCategory: {
    type: CategoryType, 
    args: {
      categoryName: {type : new GraphQLNonNull(GraphQLString)},
      department: {type : new GraphQLNonNull(GraphQLString)},
      sub_department: {type : new GraphQLNonNull(GraphQLString)},
      imag: { type: new GraphQLNonNull( GraphQLString) },
      },
   async resolve(parent, args) {

      const newImage = await cloudinaryImagesMethod(args.imag, "Category image");  

      const newCategory = await new CategoryModel({
        name: args.categoryName,
        department: args.department,
        sub_department: args.sub_department,
        image: newImage,
      }).save();
      return newCategory;
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

const CategoryMutation = helperSchema.assingObj(categoryMutation);

export { CategoryMutation };
