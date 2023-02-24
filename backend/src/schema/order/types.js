import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { UserType } from "../auth/types.js";
import { UserModel } from "../auth/models.js";

const OrderProductType = new GraphQLObjectType({
  name: "ProductOrder",
  fields: {
    brandName: { type: GraphQLString },
    count: { type: GraphQLInt },
    id: { type: GraphQLString },
    img: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    oldPrice: { type: GraphQLInt },
  },
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  description: "Order GraphQL Object Schema Model",
  fields: () => ({
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    flat: { type: new GraphQLNonNull(GraphQLString) },
    floor: { type: GraphQLString },
    entrance: { type: GraphQLString },
    intercom: { type: GraphQLString },
    privateHome: { type: GraphQLBoolean },
    products: { type: new GraphQLList(OrderProductType)},
    status: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    _id: { type: GraphQLID },
    user: {
      type: UserType,
      resolve(parent, args) {
        return UserModel.findById(parent.user_id);
      },
    },   
    
  }),
});

export { OrderType, OrderProductType };
