import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { helperSchema, ShcemaMutation } from "../../utils/index.js";
import { DirectorModel } from "./models.js";
import { DirectorType } from "./types.js";

const { addRemUpMethods } = new ShcemaMutation({
  model: DirectorModel,
  type: DirectorType,
  name: "Director",
  addArgs: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
  },
  id: { id: { type: GraphQLID } },
  updateArgs: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const DirectorMutation = helperSchema.assingObj(addRemUpMethods);

export { DirectorMutation };
