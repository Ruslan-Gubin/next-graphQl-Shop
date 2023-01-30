import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { helperSchema } from "../../utils/index.js";
import { QuestionModel } from "./models.js";
import { QuestionType } from "./types.js";


const formatedDate = () => {
  const nowDate = new Date();
  return nowDate.toTimeString().slice(0, 5);
};

const questionMutation = {
  createdDialog: {
    type: QuestionType,
    args: {
      text: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      viewed: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    resolve(parent, args) {
      const dialog = { text: args.text, name: args.name, time: formatedDate() };
      const newDialog = new QuestionModel({
        dialog: [dialog],
        viewed: args.viewed,
      }).save();
      return newDialog;
    },
  },
  addCommentDialog: {
    type: QuestionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      text: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      viewed: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    async resolve(parent, args) {
      const name = args.name ? args.name : 'Guest'
      const dialog = { text: args.text, name, time: formatedDate() };
      return await QuestionModel.findByIdAndUpdate(
        args.id,
        { $push: { dialog: dialog }, viewed: args.viewed },
        { returnDocument: "after" }
      );
    },
  },
  removeDialog: {
    type: QuestionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      return await QuestionModel.findByIdAndDelete(args.id);
    },
  },
};

const QuestionMutation = helperSchema.assingObj(questionMutation);

export { QuestionMutation };
