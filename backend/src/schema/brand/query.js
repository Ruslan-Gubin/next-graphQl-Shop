import { GraphQLList } from "graphql";
import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { BrandModel } from "./models.js";
import { BrandType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: BrandModel,
  name: "brand",
  type: BrandType,
});

const brandMethods = {
  // checkVieweds: {
  //   type: new GraphQLList(PhotoProductType),
  //  resolve(parent, args) {
  //     return  PhotoProductModel.find({viewed: false})
  //   }
  // }
 
}

const BrandQuery = Object.assign(getMethods, brandMethods)

export { BrandQuery };
