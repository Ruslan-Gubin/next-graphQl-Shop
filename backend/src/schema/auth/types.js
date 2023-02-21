import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";



const UserImageType = new GraphQLObjectType({
  name: "UserImage",
  fields: {
    url: { type: new GraphQLNonNull(GraphQLString) },
    public_id: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "Product GraphQL Object Schema Model",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: UserImageType },
    passwordHash: { type: new GraphQLNonNull(GraphQLString) },
    _id: { type: GraphQLString },
    
    // comments: { type: new GraphQLList(GraphQLString) },
    
    // photo: {
    //   type: PhotoProductType,
    //   resolve(parent, args) {
    //     return PhotoProductModel.findById(parent.photo_id);
    //   },
    // },
    
    
  }),
});

export { UserType, UserImageType };
