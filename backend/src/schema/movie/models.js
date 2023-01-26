import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true
  },
  directorId: {
    type: String,
    require: true
  }
})

export const MovieModel = mongoose.model("Movies", movieSchema);