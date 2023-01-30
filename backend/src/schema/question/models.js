import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    dialog: {
      type: Array,
      require: true,
    },
    viewed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export const QuestionModel = mongoose.model("Question", questionSchema);
