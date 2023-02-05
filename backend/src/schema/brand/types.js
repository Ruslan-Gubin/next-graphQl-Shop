import { GraphQLList,  GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProductModel, ProductType,  } from "../product/index.js";


const BrandType = new GraphQLObjectType({
  name: "Brend",
  fields: () => ({ 
    name: {type: new GraphQLNonNull(GraphQLString)},
    _id: {type: GraphQLString},
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return ProductModel.find({brand_id: parent._id})
      }
    }
  }),
});

export { BrandType }