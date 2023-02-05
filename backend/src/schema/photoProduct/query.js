import { GraphQLList } from "graphql";
import { ShcemaQuery } from "../../utils/ShcemaQuery.js";
import { PhotoProductModel } from "./models.js";
import { PhotoProductType } from "./types.js";

const { getMethods } = new ShcemaQuery({
  model: PhotoProductModel,
  name: "photoProduct",
  type: PhotoProductType,
});

const questionMethods = {
  // checkVieweds: {
  //   type: new GraphQLList(PhotoProductType),
  //  resolve(parent, args) {
  //     return  PhotoProductModel.find({viewed: false})
  //   }
  // }
 
}


const assaignMethods = Object.assign(getMethods, questionMethods) 

const PhotoProductQuery = assaignMethods;

export { PhotoProductQuery };
