import { GraphQLList } from "graphql";
import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { ProductModel } from "./models.js";
import { ProductType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: ProductModel,
  name: "product",
  type: ProductType,
});

const questionMethods = {
  // checkVieweds: {
  //   type: new GraphQLList(ProductType),
  //  resolve(parent, args) {
  //     return  ProductModel.find({viewed: false})
  //   }
  // }
}


const assaignMethods = Object.assign(getMethods, questionMethods) 


const ProductQuery = assaignMethods;

export { ProductQuery };
