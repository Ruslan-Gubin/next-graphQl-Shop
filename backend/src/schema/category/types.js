import { GraphQLList,  GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProductModel, ProductType,  } from "../product/index.js";
import { BrandModel, BrandType } from '../brand/index.js';

const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({ 
    name: {type: new GraphQLNonNull(GraphQLString)},
    _id: {type: GraphQLString},
    department: { type: new GraphQLNonNull(GraphQLString)},
    sub_department: { type: new GraphQLNonNull(GraphQLString)},
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return ProductModel.find({category_id: parent._id})
      }
    },
    brands: {
      type: new GraphQLList(BrandType),
      resolve(parent, args) {
        return BrandModel.find({category: parent._id})
      }
    }
  }),
});

export { CategoryType }