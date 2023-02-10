import { GraphQLList,  GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProductModel, ProductType,  } from "../product/index.js";


const PhotoType = new GraphQLObjectType({
  name: 'PhotoProductItem',
  fields: {
    url: { type: new GraphQLNonNull(GraphQLString) },
    public_id: {type: new GraphQLNonNull(GraphQLString)},
   }
});

const PhotoProductType = new GraphQLObjectType({
  name: "PhotoProduct",
  fields: () => ({ 
    images: {type: new GraphQLList(PhotoType)},
    _id: {type: GraphQLString},
    product: {
      type: new GraphQLList (ProductType),
      resolve(parent, args) {
        return ProductModel.find({photo_id: parent._id})
      }
    }
  }),
});

export { PhotoProductType, PhotoType }