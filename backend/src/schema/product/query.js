import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { PhotoProductModel } from "../photoProduct/models.js";
import { ProductModel } from "./models.js";
import { ProductType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: ProductModel,
  name: "product",
  type: ProductType,
});

const questionMethods = {
  getProductsUpdate: {
    type: new GraphQLList(ProductType),
    args: {
      department: {type : new GraphQLNonNull(GraphQLString)},
      sub_department: {type : new GraphQLNonNull(GraphQLString)},
      category_id: { type : new GraphQLNonNull(GraphQLID) },
      searchValue: {type : new GraphQLNonNull(GraphQLString)},
      perPage: { type : new GraphQLNonNull(GraphQLInt)},
      page: { type : new GraphQLNonNull(GraphQLInt)},
    }, 
    resolve(parent, args) {
      const perPage = args.perPage;
      const page = args.page;
      const skips = (page - 1) * perPage;

      return ProductModel.find(
        {
          category_id: args.category_id,
          department: args.department,
          sub_department: args.sub_department,
          name: {$regex: `${args.searchValue}`, $options: 'i'} 
        })
      .sort({createdAt: -1})
      .skip(skips)
      .limit(args.perPage)
    }
  },
  productsLength: {
    type: new GraphQLList(ProductType),
    args: {
      department: {type : new GraphQLNonNull(GraphQLString)},
      sub_department: {type : new GraphQLNonNull(GraphQLString)},
      category_id: { type : new GraphQLNonNull(GraphQLID) },
      searchValue: {type : new GraphQLNonNull(GraphQLString)}
    }, 
    resolve(parent, args) {
      return ProductModel.find(
        {
          category_id: args.category_id,
          department: args.department,
          sub_department: args.sub_department,
          name: {$regex: `${args.searchValue}`, $options: 'i'} 
        })
    }
  },
  sortProductDepartment: {
    type: new GraphQLList(ProductType),
    args: {
      department: {type : new GraphQLNonNull(GraphQLString)},
      sortValue: {type : new GraphQLNonNull(GraphQLString)},
    }, 
    resolve(parent, args) {
      if (args.sortValue === 'new') {
       return ProductModel.find(
          {
            department: args.department,
          }).sort({createdAt: -1}).limit(5)
        }
        if (args.sortValue === 'popular') {
          return ProductModel.find(
            {
              department: args.department,
            }).sort({views: 1}).limit(5) 
        }
    }
  },
  sortProductCatalog: {
    type: new GraphQLList(ProductType),
    args: {
      department: {type : new GraphQLNonNull(GraphQLString)},
      
    }, 
    resolve(parent, args) {
      
       return ProductModel.find(
          {
            department: args.department,
          }).sort({createdAt: -1}).limit(0)
   
  
        
    }
  },

}


const assaignMethods = Object.assign(getMethods, questionMethods) 


const ProductQuery = assaignMethods;

export { ProductQuery };
