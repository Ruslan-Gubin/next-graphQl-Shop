import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLString,
} from "graphql";
import { cloudinaryImagesMethod, cloudinaryImagesRemove } from "../../utils/cloudinaryImagesMethod.js";
import { helperSchema } from "../../utils/index.js";
import { UserModel } from "./models.js";
import { UserType } from "./types.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// const PhotoTypeScalar = new GraphQLScalarType({
//   name: 'PhotoProductScalar',
//   fields: {
//     url: { type: new GraphQLNonNull(GraphQLString) },
//     public_id: {type: new GraphQLNonNull(GraphQLString)},
//    }
// });

const getToken = (id) => {
  return jwt.sign({ _id: id }, 'secret123', {
    expiresIn: '30d',
  });
}


const userMutation = {
 
  createdUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLString },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {

      const checkValidPhone = await UserModel.find({phone: args.phone}) 

      if (checkValidPhone.length) {
        throw new Error('Телефон уже зарегестрирован !!!')
      }

    const pas = args.password;
    const salt = await bcrypt.genSalt(10);
    const passwordBcrypt = await bcrypt.hash(pas, salt)

      const newUser = await new UserModel({
        name: args.name,
        phone: args.phone,
        email: args.email,
        passwordHash: passwordBcrypt,
        image: {url: '', public_id: ''},
      }).save();

      const token = getToken(newUser._id);
      
      const { passwordHash, ...userData } = newUser._doc;

      return { ...userData, token };
    },
  },

  loginUser: {
    type: UserType,
    args: {
      phone: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {

      const user = await UserModel.findOne({ phone: args.phone });

      if (!user) {
        throw new Error('User undefined')
      }

      const isValidPass = await bcrypt.compare(args.password, user._doc.passwordHash); 

      if (!isValidPass) {
        throw new Error('Неверный телефон или пароль');
      }

      const token = getToken(user._id);

      const { passwordHash, ...userData } = user._doc;

      return { ...userData, token };
    },
  },

  updateUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      id: {type: new GraphQLNonNull(GraphQLID)},
      imag: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const user = await UserModel.findById(args.id)
      
      const name = args.name ? args.name : user.name
      const email = args.email ? args.email : user.email
      
      if (user.image.url && args.imag == user.image.url) {
        const userUpdate = await UserModel.findByIdAndUpdate(
          args.id,
          { name, email },
          { returnDocument: 'after' },
          );
          
          return userUpdate
          
        } else {
        const imgId = user.image.public_id;
        if (imgId) {
          await cloudinaryImagesRemove(imgId)
          .catch(error => console.log(error)); // remove prev avatar
        }
  
      const newImag = await cloudinaryImagesMethod(args.imag, 'UsersPhotoGraphQl')
      .catch(error => console.log(error));

        const userUpdate = await UserModel.findByIdAndUpdate(
           args.id ,
          {
            name,
            email,
            image: newImag,
          },
          { returnDocument: 'after' },
        );

          return userUpdate

      }

    },
  },

  removeUser: {
    type: UserType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)},
    },
  async resolve(parent, args) {
    const remove = await UserModel.findByIdAndDelete(args.id);

    const imgId = remove.image.public_id;
        if (imgId) {
          await cloudinaryImagesRemove(imgId)
          .catch(error => console.log(error)); // remove prev avatar
        }
      
     return remove 
    }
  },


};

const UserMutation = helperSchema.assingObj(userMutation);

export { UserMutation };
