import { GraphQLInt,  GraphQLList,  GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { PhotoProductModel, PhotoProductType } from '../photoProduct/index.js'
import { BrandModel, BrandType } from '../brand/index.js';
import { CategoryModel, CategoryType } from '../category/index.js';

const OptionsType = new GraphQLObjectType({
  name: 'Options',
  fields: {
      name: {type: new GraphQLNonNull(GraphQLString)},
      value: {type: new GraphQLNonNull(GraphQLString)}
   }
});


const ProductType = new GraphQLObjectType({
  name: "Product",
  description: 'Product GraphQL Object Schema Model',
  fields: () => ({ 
    name: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: new GraphQLNonNull(GraphQLString)},
    colors_names: {type: new GraphQLNonNull(GraphQLString)},
    // brand_name: {type: new GraphQLNonNull(GraphQLString)},
    photo_count: {type: new GraphQLNonNull(GraphQLInt)},
    views: { type: GraphQLInt },
    colors: {type: new GraphQLList(GraphQLString)},   
    options: {type: new GraphQLList(OptionsType)},
    _id: {type: GraphQLString},
    photo: {
      type: PhotoProductType,
      resolve(parent, args) {
        return PhotoProductModel.findById(parent.photo_id)
      }
    },
    brand: {
      type: BrandType,
      resolve(parent, args) {
        return BrandModel.findById(parent.brand_id)
      }
    },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return CategoryModel.findById(parent.category_id)
      }
    },

  }),
});

export { ProductType,  OptionsType }