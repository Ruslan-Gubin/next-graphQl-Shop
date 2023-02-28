import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserModel, UserType } from '../auth/index.js';
import { ProductModel, ProductType } from '../product/index.js';

const FeedbackImgType = new GraphQLObjectType({
  name: 'FeedbackImgType',
  fields: {
      url: {type: new GraphQLNonNull(GraphQLString)},
      public_id: {type: new GraphQLNonNull(GraphQLString)},
   }
});

const FeedbackType = new GraphQLObjectType({
  name: "Feedback",
  fields: () => ({ 
    text: {type: new GraphQLNonNull(GraphQLString)},
    img: { type: FeedbackImgType },
    _id: {type: GraphQLString},
    user_opinion: { type: new GraphQLNonNull(GraphQLInt) },
    like: { type: new GraphQLNonNull(GraphQLInt) },
    dislike: { type: new GraphQLNonNull(GraphQLInt) },
    createdAt: {type: new GraphQLNonNull(GraphQLString)},
    user_id: {type: new GraphQLNonNull(GraphQLString)},
    product_id: {type: new GraphQLNonNull(GraphQLString)},
    
    user: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.findById( parent.user_id )
      }
    },
    product: {
      type: ProductType,
      resolve(parent, args) {
        return ProductModel.findById( parent.product_id )
      }
    }

  }),
});

export { FeedbackType }