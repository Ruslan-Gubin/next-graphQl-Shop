import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { CategoryModel } from "./models.js";
import { CategoryType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: CategoryModel,
  name: "category",
  type: CategoryType,
});

const categoryMethods = {
  sortCategory: {
    type: new GraphQLList(CategoryType),
    args: {
      department: {type : new GraphQLNonNull(GraphQLString)},
      sub_department: {type : new GraphQLNonNull(GraphQLString)},
    },
   resolve(parent, args) {
      return  CategoryModel.find({department: args.department, sub_department: args.sub_department})
    }
  }
 
}

const CategoryQuery = Object.assign(getMethods, categoryMethods)

export { CategoryQuery };
