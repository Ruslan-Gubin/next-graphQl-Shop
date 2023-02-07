import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { BrandModel } from "./models.js";
import { BrandType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: BrandModel,
  name: "brand",
  type: BrandType,
});

const brandMethods = {
  sortBrand: {
    type: new GraphQLList(BrandType),
    args: {
      id: {type : new GraphQLNonNull(GraphQLString)},
    },
   resolve(parent, args) {
      return  BrandModel.find({category: args.id})
    }
  }
 
}

const BrandQuery = Object.assign(getMethods, brandMethods)

export { BrandQuery };
