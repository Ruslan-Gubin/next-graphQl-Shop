import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { DirectorModel } from "./models.js";
import { DirectorType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: DirectorModel,
  name: "director",
  type: DirectorType,
});

const DirectorQuery = getMethods;

export { DirectorQuery }
