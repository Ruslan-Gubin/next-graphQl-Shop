import {  GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLScalarType, GraphQLString } from "graphql";
import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { OrderModel } from "./models.js";
import { OrderType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: OrderModel,
  name: "order",
  type: OrderType,
});

// const sortPropertyScale = new GraphQLScalarType({
//   name: "sortPropertyScale",
//   fields: {
//     name: { type: GraphQLString },
//     value: { type: GraphQLInt },
//   },
// });

const orderMethods = {
  sortOrdersUser: {
    type: new GraphQLList(OrderType),
    args: {
      user_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return OrderModel.find({user_id: args.user_id}).sort({createdAt: -1})
    }
  },
  getUserOrdersLength: {
    type: new GraphQLList(OrderType),
    args: {
      user_id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return OrderModel.find({user_id: args.user_id})
    }
  },
  getAllOrders: {
    type: new GraphQLList(OrderType),
    args: {},
    resolve(parent, args) {
      return OrderModel.find({})
    }
  },
  getNewLength: {
    type: new GraphQLList(OrderType),
    args: {},
    resolve(parent, args) {
      return OrderModel.find({status: 'new'})
    }
  }
  


  // getProductsUpdate: {
  //   type: new GraphQLList(ProductType),
  //   args: {
  //     department: {type : new GraphQLNonNull(GraphQLString)},
  //     sub_department: {type : new GraphQLNonNull(GraphQLString)},
  //     category_id: { type : new GraphQLNonNull(GraphQLID) },
  //     searchValue: {type : new GraphQLNonNull(GraphQLString)},
  //     perPage: { type : new GraphQLNonNull(GraphQLInt)},
  //     page: { type : new GraphQLNonNull(GraphQLInt)},
  //   }, 
  //   resolve(parent, args) {
  //     const perPage = args.perPage;
  //     const page = args.page;
  //     const skips = (page - 1) * perPage;

  //     return ProductModel.find(
  //       {
  //         category_id: args.category_id,
  //         department: args.department,
  //         sub_department: args.sub_department,
  //         name: {$regex: `${args.searchValue}`, $options: 'i'} 
  //       })
  //     .sort({createdAt: -1})
  //     .skip(skips)
  //     .limit(args.perPage)
  //   }
  // },

 

  

}


const assaignMethods = Object.assign(getMethods, orderMethods) 


const OrderQuery = assaignMethods;

export { OrderQuery };
