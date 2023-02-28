import { GraphQLList } from "graphql";
import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { FeedbackModel } from "./models.js";
import { FeedbackType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: FeedbackModel,
  name: "feedback",
  type: FeedbackType,
});

const feedbackMethods = {
  // checkVieweds: {
  //   type: new GraphQLList(QuestionType),
  //  resolve(parent, args) {
  //     return  QuestionModel.find({viewed: false})
  //   }
  // }
}


const FeedbackQuery = Object.assign(getMethods, feedbackMethods)

export { FeedbackQuery };
