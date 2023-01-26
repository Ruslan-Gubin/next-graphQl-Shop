import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { MovieModel } from "./models.js";
import { MovieType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: MovieModel,
  name: "movie",
  type: MovieType,
});

const MovieQuery = getMethods;

export { MovieQuery };
