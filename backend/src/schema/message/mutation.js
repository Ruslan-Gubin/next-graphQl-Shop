import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { ShcemaMutation, helperSchema } from "../../utils/index.js";
import { MovieModel } from "./models.js";
import { MovieType } from "./types.js";

const { addRemUpMethods } = new ShcemaMutation({
  model: MovieModel,
  type: MovieType,
  name: "Movie",
  addArgs: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    directorId: { type: GraphQLID },
  },
  id: { id: { type: GraphQLID } },
  updateArgs: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    directorId: { type: GraphQLID },
  },
});

const MovieMutation = helperSchema.assingObj(addRemUpMethods);

export { MovieMutation };
