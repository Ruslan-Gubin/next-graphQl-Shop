import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {QuestionQuery, QuestionMutation} from './question/index.js';
import { helperSchema } from "../utils/helperSchema.js";
import { PhotoProductMutation, PhotoProductQuery } from "./photoProduct/index.js";
import { ProductQuery, ProductMutation } from "./product/index.js";
import { BrandQuery, BrandMutation } from "./brand/index.js";
import { CategoryQuery, CategoryMutation } from './category/index.js';
import { UserQuery, UserMutation } from "./auth/index.js";
import { OrderQuery , OrderMutation } from "./order/index.js";
import { FeedbackQuery, FeedbackMutation } from './feedback/index.js';

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...helperSchema.assingObj(
      QuestionQuery,
      PhotoProductQuery,
      ProductQuery,
      BrandQuery,
      CategoryQuery,
      UserQuery,
      OrderQuery,
      FeedbackQuery,
      ), 
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...helperSchema.assingObj(
    QuestionMutation,
    PhotoProductMutation,
    ProductMutation,
    BrandMutation,
    CategoryMutation,
    UserMutation,
    OrderMutation,
    FeedbackMutation,
    ),
  },
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export { schema };
