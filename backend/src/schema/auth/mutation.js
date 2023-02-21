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
        throw new Error('Invalid username or passworld');
      }

      const token = getToken(user._id);

      const { passwordHash, ...userData } = user._doc;

      return { ...userData, token };
    },
  },

  updateUser: {
    type: UserType,
    args: {
      name: { type: GraphQLString },
      phone: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: new GraphQLNonNull(GraphQLString) },
      imag: { type: GraphQLString },
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    async resolve(parent, args) {

      const pas = args.password;
      const salt = await bcrypt.genSalt(10);
      const passwordBcrypt = await bcrypt.hash(pas, salt)
    

      const user = await UserModel.findById(args.id)
      
      const name = args.name ? args.name : user.name
      const phone = args.phone ? args.phone : user.phone
      const email = args.email ? args.email : user.email
      
      if (user.image && args.imag === user.image) {
        return await UserModel.updateOne(
          { _id: args.id },
          { name, passwordHash: passwordBcrypt, image: user.image, phone, email },
          { returnDocument: 'after' },
        );
      } else if (user.image.url !== args.imag ) {
        const imgId = user.image.public_id;
        if (imgId) {
          await cloudinaryImagesRemove(imgId)
          .catch(error => console.log(error)); // remove prev avatar
        }
  
      const newImag = await cloudinaryImagesMethod(args.imag, 'UsersPhotoGraphQl')
      .catch(error => console.log(error));

        return await UserModel.updateOne(
          { _id: args.id },
          {
            name,
            phone,
            email,
            passwordHash: passwordBcrypt,
            image: newImag,
          },
          { returnDocument: 'after' },
        );
      }

    },
  },

  // async update(body: types.UpdateUserBody): Promise<UpdateWriteOpResult | undefined> {
  //   const idAuth = body.id;
  //   const pas = body.password;
  //   const salt = await bcrypt.genSalt(7);
  //   const passwordBcrypt = await bcrypt.hash(pas, salt);

  //   const prevAuth = await this.model.findOne({ _id: idAuth });
  //   const prevImage = prevAuth?.image; //find prev image user

  //   if (body.imag === body.prevImage) {
  //      return await this.model.updateOne(
  //       { _id: idAuth },
  //       { ...body, passwordHash: passwordBcrypt, image: prevImage },
  //       { returnDocument: 'after' },
  //     );
  //   } else if (prevImage?.url !== body.imag) {
  //     const imgId = prevAuth?.image.public_id;
  //     if (imgId) {
  //       await cloudinary.uploader.destroy(imgId); // remove prev avatar
  //     }

  //     const newAvatar = body.imag;
  //     const result = await cloudinary.uploader.upload(newAvatar, {
  //       folder: 'Users',
  //       fetch_format: 'auto',
  //     });

  //     return await this.model.updateOne(
  //       { _id: idAuth },
  //       {
  //         ...body,
  //         passwordHash: passwordBcrypt,
  //         image: { public_id: result.public_id, url: result.secure_url },
  //       },
  //       { returnDocument: 'after' },
  //     );
  //   } 
  // }


  // removeProduct: {
  //   type: new GraphQLList(ProductType),
  //   args: {
  //     product_id: { type : new GraphQLNonNull(GraphQLID) },
  //     photo_id: { type : new GraphQLNonNull(GraphQLID) },
  //     category_id: { type : new GraphQLNonNull(GraphQLID) },
  //     brand_id: { type : new GraphQLNonNull(GraphQLID) },
  //     images: { type: new GraphQLList(PhotoTypeScalar)}
  //   }, 
  //  async resolve(parent, args) {
  //     await ProductModel.findByIdAndDelete(args.product_id);  

  //   const category = await CategoryModel.findByIdAndUpdate(args.category_id,   
  //     {$pull: {products: args.product_id}},
  //     {returnDocument: "after"}    
  //     )
      
  //     if (category.products.length === 0) {
  //     await  cloudinaryImagesRemove(category.image.public_id).catch(error => console.log(error))
  //       await BrandModel.findByIdAndUpdate(args.brand_id,
  //         {$pull: {category: category._id}},
  //         {returnDocument: "after"} 
  //         )
  //         await category.remove()
  //       } 
        
  //       const brand =  await BrandModel.findByIdAndUpdate(args.brand_id,
  //         {$pull: {products: args.product_id}},
  //         {returnDocument: "after"}       
  //         )
 
  //         if (brand.products.length === 0) {
  //           await  cloudinaryImagesRemove(brand.image.public_id).catch(error => console.log(error))
  //           brand.remove()
  //           await CategoryModel.findByIdAndUpdate(args.category_id,
  //             {$pull: {brands: brand._id}}, 
  //             )
  //         }
          
  //   for (const item of args.images) {
  //     const imgPublicId = item.public_id;
  //     cloudinaryImagesRemove(imgPublicId).catch(error => console.log(error))
  //   }
  //   await PhotoProductModel.findByIdAndDelete(args.photo_id).catch(err => console.log(err));

  //   }
  // },

  // updateProductBasic: {
  //   type: ProductType,
  //   args: {
  //     product_id: { type : new GraphQLNonNull(GraphQLID) },
  //     name: { type : new GraphQLNonNull(GraphQLString) },
  //     option_value: {type: new GraphQLList(prodOptionScalar)},
  //     description: { type : new GraphQLNonNull(GraphQLString) },
  //     price: { type : new GraphQLNonNull(GraphQLInt) },
  //     oldPrice: { type : new GraphQLNonNull(GraphQLInt) },
  //     count: { type : new GraphQLNonNull(GraphQLInt) },
  //   }, 
  //  async resolve(parent, args) {
  //     const discount =
  //         args.oldPrice &&
  //         Math.ceil(((args.price - args.oldPrice) / args.oldPrice) * 100);
  
  //     return await ProductModel.findByIdAndUpdate(args.product_id,
  //         {
  //           name: args.name,
  //           description: args.description,
  //           price: args.price,
  //           oldPrice: args.oldPrice ? args.oldPrice : 0,
  //           count: args.count,
  //           options: args.option_value,
  //           discount: args.oldPrice ? discount : false,
  //         }
  //         )
  //   },
  // },
  

};

const UserMutation = helperSchema.assingObj(userMutation);

export { UserMutation };
