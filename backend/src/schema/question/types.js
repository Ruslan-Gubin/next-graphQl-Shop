import { GraphQLBoolean,  GraphQLList,  GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";


const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
      text: {type: new GraphQLNonNull(GraphQLString)},
      name: {type: new GraphQLNonNull(GraphQLString)},
      time: {type: new GraphQLNonNull(GraphQLString)}
   }
});

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({ 
    dialog: {type: new GraphQLList(MessageType)},
    viewed: { type: GraphQLBoolean },
    _id: {type: GraphQLString},
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export { QuestionType }