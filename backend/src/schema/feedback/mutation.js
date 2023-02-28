import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { cloudinaryImagesMethod, cloudinaryImagesRemove } from "../../utils/cloudinaryImagesMethod.js";
import { helperSchema } from "../../utils/index.js";
import { FeedbackModel } from "./models.js";
import { FeedbackType } from "./types.js";


const feedbackMutation = {
  createdFeedback: {
    type: FeedbackType,
    args: {
      text: { type: new GraphQLNonNull(GraphQLString) },
      user_id: { type: new GraphQLNonNull(GraphQLString) },
      product_id: { type: new GraphQLNonNull(GraphQLString) },
      img: { type: GraphQLString },
      user_opinion: { type: GraphQLInt },
    },
  async resolve(parent, args) {

      if (args.img.length > 0) {
        const file = args.img;
        const newImage = await cloudinaryImagesMethod(file, "Feedback");
        const newFeedback = await new FeedbackModel({
          text: args.text,
          user_id: args.user_id,
          product_id: args.product_id,
          user_opinion: args.user_opinion,
          img: newImage,
        }).save();
        return newFeedback;
      } else {
        const newFeedback = await new FeedbackModel({
          text: args.text,
          user_id: args.user_id,
          product_id: args.product_id,
          user_opinion: args.user_opinion,
        }).save();
        return newFeedback;
      }
         
    },
  },
  removeFeedback: {
    type: FeedbackType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
  async resolve(parent, args) {

    const feedbackTarget = await FeedbackModel.findById(args.id)

    if (feedbackTarget.img) {
      const removeImg = feedbackTarget.img.public_id
      await cloudinaryImagesRemove(removeImg)
    }

  return  feedbackTarget.remove()
    
         
    },
  },
  // addCommentDialog: {
  //   type: QuestionType,
  //   args: {
  //     id: { type: new GraphQLNonNull(GraphQLID) },
  //     text: { type: new GraphQLNonNull(GraphQLString) },
  //     name: { type: new GraphQLNonNull(GraphQLString) },
  //     viewed: { type: new GraphQLNonNull(GraphQLBoolean) },
  //   },
  //   async resolve(parent, args) {
  //     const name = args.name ? args.name : 'Guest'
  //     const dialog = { text: args.text, name, time: formatedDate() };
  //     return await QuestionModel.findByIdAndUpdate(
  //       args.id,
  //       { $push: { dialog: dialog }, viewed: args.viewed },
  //       { returnDocument: "after" }
  //     );
  //   },
  // },
  // removeDialog: {
  //   type: QuestionType,
  //   args: {
  //     id: { type: new GraphQLNonNull(GraphQLID) },
  //   },
  //   async resolve(parent, args) {
  //     return await QuestionModel.findByIdAndDelete(args.id);
  //   },
  // },
};

const FeedbackMutation = helperSchema.assingObj(feedbackMutation);

export { FeedbackMutation };
