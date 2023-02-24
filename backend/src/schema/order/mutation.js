import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLString,
} from "graphql";
import { helperSchema } from "../../utils/index.js";
import { ProductModel } from "../product/models.js";
import { OrderModel } from "./models.js";
import { OrderType } from "./types.js";

const OrderProductScalar = new GraphQLScalarType({
  name: 'OrderProductScalar',
  fields: {
    brandName: { type: GraphQLString },
    count: { type: GraphQLInt },
    id: { type: GraphQLString },
    img: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    oldPrice: { type: GraphQLInt },
   }
});

const OrderProductsListScalar = new GraphQLScalarType({
  name: 'OrderProductsListScalar',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    count: { type: new GraphQLNonNull(GraphQLInt) },
   }
});

const orderMutation = {
  createdOrder: {
    type: OrderType,
    args: {
      user_id: { type: new GraphQLNonNull(GraphQLID) },
      street: { type: new GraphQLNonNull(GraphQLString) },
      flat: { type: new GraphQLNonNull(GraphQLString) },
      floor: { type: GraphQLString },
      entrance: { type: GraphQLString },
      intercom: { type: GraphQLString },
      privateHome: { type: GraphQLBoolean },
      products: { type: new GraphQLList(OrderProductScalar) } ,
    },
    async resolve(parent, args) {
      return await new OrderModel({...args}).save();
    },
  },
  removeOrder: {
    type: OrderType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      return await OrderModel.findByIdAndDelete(args.id);
    },
  },
  updateStatusOrder: {
    type: OrderType,
    args: {
      status: { type: new GraphQLNonNull(GraphQLString) },
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {

      const newUpdate = await OrderModel.findByIdAndUpdate(args.id,
        {status: args.status},
        {returnDocument: 'after'}
        );
        
      return newUpdate
    },
  },
  removeOrderAndUpdateProduct: {
    type: OrderType,
    args: {
      products: { type: new GraphQLList(OrderProductsListScalar) },
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      if (!args) {
        throw new Error('Не найдены данные')
      }
    

      for (const key of args.products) {
        await ProductModel.findByIdAndUpdate(key.id,
          {$inc: {count: - key.count}}
          )
          .catch(() => {
            throw new Error('Не удалось обновить количество на складе')
          })
      }

      const removeOrder = await OrderModel.findByIdAndDelete(args.id);
      return removeOrder
    },
  },

  // removeOrder: {
  //   type: new GraphQLList(OrderType),
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
  //   type: OrderType,
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

const OrderMutation = helperSchema.assingObj(orderMutation);

export { OrderMutation };
