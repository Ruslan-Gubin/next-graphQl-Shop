import mongoose from "mongoose";
const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    text: {
      type: String,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
    },
    product_id: {
      type: String,
      require: true,
    },
    img: {
      type: {url: String, public_id: String},
    },
    user_opinion: {
      type: Number,
      default: 5,
    },
    like: {
      type: Number,
      default: 0
    },
    dislike: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

export const FeedbackModel = mongoose.model("Feedback", feedbackSchema);
