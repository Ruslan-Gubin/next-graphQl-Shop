import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { DirectorQuery, DirectorMutation } from "./direcrot/index.js";
import { MovieQuery, MovieMutation } from "./movie/index.js";
import { helperSchema } from "../utils/helperSchema.js";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...helperSchema.assingObj(MovieQuery, DirectorQuery),
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...helperSchema.assingObj(DirectorMutation, MovieMutation),
  },
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export { schema };
