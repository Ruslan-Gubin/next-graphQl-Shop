import { GraphQLID, GraphQLList } from "graphql";

export class ShcemaQuery {
  constructor({ model, name, type }) {
    this.model = model;
    this.name = name;
    this.type = type;
  }

  getOneItem(model, type) {
    return {
      type: type,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return model.findById(args.id);
      },
    };
  }

  getAllItem(model, type) {
    return {
      type: new GraphQLList(type),
      resolve(parent, args) {
        return model.find({});
      },
    };
  }

  get getMethods() {
    const map = {};
    const onceName = this.name;
    const allName = `${this.name}s`;
    map[onceName] = this.getOneItem(this.model, this.type);
    map[allName] = this.getAllItem(this.model, this.type);
    return map;
  }
}
