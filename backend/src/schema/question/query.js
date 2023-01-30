import { GraphQLList } from "graphql";
import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { QuestionModel } from "./models.js";
import { QuestionType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: QuestionModel,
  name: "question",
  type: QuestionType,
});

const questionMethods = {
  checkVieweds: {
    type: new GraphQLList(QuestionType),
   resolve(parent, args) {
      return  QuestionModel.find({viewed: false})
    }
  }
}


const assaignMethods = Object.assign(getMethods, questionMethods) 


const QuestionQuery = assaignMethods;

export { QuestionQuery };
