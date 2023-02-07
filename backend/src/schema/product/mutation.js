import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLString,
} from "graphql";
import { helperSchema } from "../../utils/index.js";
import { BrandModel } from "../brand/models.js";
import { CategoryModel } from "../category/models.js";
import { PhotoProductModel } from "../photoProduct/models.js";
import { ProductModel } from "./models.js";
import { ProductType } from "./types.js";

const prodOptionScalar = new GraphQLScalarType({
  name: "prodOptionScalar",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const productMutation = {
  createdProduct: {
    type: ProductType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      colors_names: { type: new GraphQLNonNull(GraphQLString) },
      count: { type: new GraphQLNonNull(GraphQLInt) },
      price: { type: new GraphQLNonNull(GraphQLInt) },
      oldPrice: { type: new GraphQLNonNull(GraphQLInt) },
      options: { type: new GraphQLList(prodOptionScalar) },
      categoryId: { type: new GraphQLNonNull(GraphQLString) },
      brandId: { type: new GraphQLNonNull(GraphQLString) },
      photo_id: { type: new GraphQLNonNull(GraphQLString) },
      photo_count: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(parent, args) {
      const discount =
        args.oldPrice &&
        Math.ceil(((args.price - args.oldPrice) / args.oldPrice) * 100);

      const newProduct = await new ProductModel({
        name: args.name,
        description: args.description,
        colors_names: args.colors_names,
        count: args.count,
        price: args.price,
        options: args.options,
        discount: args.oldPrice ? discount : false,
        oldPrice: args.oldPrice ? args.oldPrice : "",
        photo_count: args.photo_count,
        brand_id: args.brandId,
        category_id: args.categoryId,
        photo_id: args.photo_id,
      }).save();

      await BrandModel.findByIdAndUpdate(
        { _id: args.brandId },
        { $addToSet: { products: newProduct._id, category: args.categoryId } }
      );

      await CategoryModel.findByIdAndUpdate(
        { _id: args.categoryId },
        { $addToSet: { products: newProduct._id, brands: args.brandId } }
      );

      await PhotoProductModel.findByIdAndUpdate(
        { _id: args.photo_id },
        { product_id: newProduct._id }
      );

      return newProduct;
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

const ProductMutation = helperSchema.assingObj(productMutation);

export { ProductMutation };
