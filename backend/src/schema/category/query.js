import { GraphQLList } from "graphql";
import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { CategoryModel } from "./models.js";
import { CategoryType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: CategoryModel,
  name: "category",
  type: CategoryType,
});

const categoryMethods = {
  // checkVieweds: {
  //   type: new GraphQLList(PhotoProductType),
  //  resolve(parent, args) {
  //     return  PhotoProductModel.find({viewed: false})
  //   }
  // }
 
}

const CategoryQuery = Object.assign(getMethods, categoryMethods)

export { CategoryQuery };
