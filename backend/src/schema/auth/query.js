import {  GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLScalarType, GraphQLString } from "graphql";
import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { UserModel } from "./models.js";
import {  UserType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: UserModel,
  name: "user",
  type: UserType,
});



const userMethods = {
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
  // productsLength: {
  //   type: new GraphQLList(ProductType),
  //   args: {
  //     department: {type : new GraphQLNonNull(GraphQLString)},
  //     sub_department: {type : new GraphQLNonNull(GraphQLString)},
  //     category_id: { type : new GraphQLNonNull(GraphQLID) },
  //     searchValue: {type : new GraphQLNonNull(GraphQLString)}
  //   }, 
  //   resolve(parent, args) {
  //     return ProductModel.find(
  //       {
  //         category_id: args.category_id,
  //         department: args.department,
  //         sub_department: args.sub_department,
  //         name: {$regex: `${args.searchValue}`, $options: 'i'} 
  //       })
  //   }
  // },
  // sortProductDepartment: {
  //   type: new GraphQLList(ProductType),
  //   args: {
  //     department: {type : new GraphQLNonNull(GraphQLString)},
  //     sortValue: {type : new GraphQLNonNull(GraphQLString)},
  //   }, 
  //   resolve(parent, args) {
  //     if (args.sortValue === 'new') {
  //      return ProductModel.find(
  //         {
  //           department: args.department,
  //         }).sort({createdAt: -1}).limit(5)
  //       }
  //       if (args.sortValue === 'popular') {
  //         return ProductModel.find(
  //           {
  //             department: args.department,
  //           }).sort({views: 1}).limit(5) 
  //       }
  //   }
  // },
//   sortSimilarProduct: {
//     type: new GraphQLList(ProductType),
//     args: {
//       department: {type : new GraphQLNonNull(GraphQLString)},
//       sub_department: {type : new GraphQLNonNull(GraphQLString)},
//       category_id: {type : new GraphQLNonNull(GraphQLString)},
//       exception: {type : new GraphQLNonNull(GraphQLString)},
//     }, 
//     resolve(parent, args) {
//        return ProductModel.find(
//           {
//             $and: [{
//               department: args.department,
//               sub_department: args.sub_department,
//               category_id: args.category_id,
// },
// { _id: {$ne: args.exception}}
//             ]
           
//           }
          
//           ).sort({createdAt: -1}).limit(5)
//     }
//   },
  // sortProductCatalog: {
  //   type: new GraphQLList(ProductType),
  //   args: {
  //     department: {type : new GraphQLNonNull(GraphQLString)},
  //     sub_department: { type : new GraphQLNonNull(GraphQLString) },
  //     sortProperty: { type : sortPropertyScale },
  //   }, 
  //   resolve(parent, args) {
  //     const sort = {}
  //     sort[args.sortProperty.name] = args.sortProperty.value
  //      return ProductModel.find(
  //         {
  //           department: args.department,
  //           sub_department: args.sub_department,
  //         }).sort(sort).limit(0)
  //   }
  // },

}


const assaignMethods = Object.assign(getMethods, userMethods) 


const UserQuery = assaignMethods;

export { UserQuery };
