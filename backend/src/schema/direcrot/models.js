import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  }
})

export const DirectorModel = mongoose.model("Directors", DirectorSchema);