import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLString,
} from "graphql";
import { cloudinaryImagesRemove } from "../../utils/cloudinaryImagesMethod.js";
import { helperSchema } from "../../utils/index.js";
import { BrandModel } from "../brand/models.js";
import { CategoryModel } from "../category/models.js";
import { PhotoProductModel } from "../photoProduct/models.js";
import { ProductModel } from "./models.js";
import { ProductType } from "./types.js";

const PhotoTypeScalar = new GraphQLScalarType({
  name: 'PhotoProductScalar',
  fields: {
    url: { type: new GraphQLNonNull(GraphQLString) },
    public_id: {type: new GraphQLNonNull(GraphQLString)},
   }
});

const prodOptionScalar = new GraphQLScalarType({
  name: "prodOptionScalar",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const productMutation = {
  createdProduct: {
    type: ProductType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      colors_names: { type: new GraphQLNonNull(GraphQLString) },
      count: { type: new GraphQLNonNull(GraphQLInt) },
      price: { type: new GraphQLNonNull(GraphQLInt) },
      oldPrice: { type: new GraphQLNonNull(GraphQLInt) },
      options: { type: new GraphQLList(prodOptionScalar) },
      categoryId: { type: new GraphQLNonNull(GraphQLString) },
      brandId: { type: new GraphQLNonNull(GraphQLString) },
      photo_id: { type: new GraphQLNonNull(GraphQLString) },
      photo_count: { type: new GraphQLNonNull(GraphQLInt) },
      department: { type: new GraphQLNonNull(GraphQLString) },
      sub_department: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {
      const discount =
        args.oldPrice &&
        Math.ceil(((args.price - args.oldPrice) / args.oldPrice) * 100);

      const newProduct = await new ProductModel({
        department: args.department,
        sub_department: args.sub_department,
        name: args.name,
        description: args.description,
        colors_names: args.colors_names,
        count: args.count,
        price: args.price,
        options: args.options,
        discount: args.oldPrice ? discount : 0,
        oldPrice: args.oldPrice ? args.oldPrice : 0,
        photo_count: args.photo_count,
        brand_id: args.brandId,
        category_id: args.categoryId,
        photo_id: args.photo_id,
      }).save();

      await BrandModel.findByIdAndUpdate(
        { _id: args.brandId },
        { $addToSet: { products: newProduct._id, category: args.categoryId } }
      );

      await CategoryModel.findByIdAndUpdate(
        { _id: args.categoryId },
        { $addToSet: { products: newProduct._id, brands: args.brandId } }
      );

      await PhotoProductModel.findByIdAndUpdate(
        { _id: args.photo_id },
        { product_id: newProduct._id }
      );

      return newProduct;
    },
  },
  removeProduct: {
    type: new GraphQLList(ProductType),
    args: {
      product_id: { type : new GraphQLNonNull(GraphQLID) },
      photo_id: { type : new GraphQLNonNull(GraphQLID) },
      category_id: { type : new GraphQLNonNull(GraphQLID) },
      brand_id: { type : new GraphQLNonNull(GraphQLID) },
      images: { type: new GraphQLList(PhotoTypeScalar)}
    }, 
   async resolve(parent, args) {
      await ProductModel.findByIdAndDelete(args.product_id);  

    const category = await CategoryModel.findByIdAndUpdate(args.category_id,   
      {$pull: {products: args.product_id}},
      {returnDocument: "after"}    
      )
      
      if (category.products.length === 0) {
      await  cloudinaryImagesRemove(category.image.public_id).catch(error => console.log(error))
        await BrandModel.findByIdAndUpdate(args.brand_id,
          {$pull: {category: category._id}},
          {returnDocument: "after"} 
          )
          await category.remove()
        } 
        
        const brand =  await BrandModel.findByIdAndUpdate(args.brand_id,
          {$pull: {products: args.product_id}},
          {returnDocument: "after"}       
          )
 
          if (brand.products.length === 0) {
            await  cloudinaryImagesRemove(brand.image.public_id).catch(error => console.log(error))
            brand.remove()
            await CategoryModel.findByIdAndUpdate(args.category_id,
              {$pull: {brands: brand._id}}, 
              )
          }
          
    for (const item of args.images) {
      const imgPublicId = item.public_id;
      cloudinaryImagesRemove(imgPublicId).catch(error => console.log(error))
    }
    await PhotoProductModel.findByIdAndDelete(args.photo_id).catch(err => console.log(err));

    }
  },

  updateProductBasic: {
    type: ProductType,
    args: {
      product_id: { type : new GraphQLNonNull(GraphQLID) },
      name: { type : new GraphQLNonNull(GraphQLString) },
      option_value: {type: new GraphQLList(prodOptionScalar)},
      description: { type : new GraphQLNonNull(GraphQLString) },
      price: { type : new GraphQLNonNull(GraphQLInt) },
      oldPrice: { type : new GraphQLNonNull(GraphQLInt) },
      count: { type : new GraphQLNonNull(GraphQLInt) },
    }, 
   async resolve(parent, args) {
      const discount =
          args.oldPrice &&
          Math.ceil(((args.price - args.oldPrice) / args.oldPrice) * 100);
  
      return await ProductModel.findByIdAndUpdate(args.product_id,
          {
            name: args.name,
            description: args.description,
            price: args.price,
            oldPrice: args.oldPrice ? args.oldPrice : 0,
            count: args.count,
            options: args.option_value,
            discount: args.oldPrice ? discount : false,
          }
          )
    },
  },
  

};

const ProductMutation = helperSchema.assingObj(productMutation);

export { ProductMutation, PhotoTypeScalar };
