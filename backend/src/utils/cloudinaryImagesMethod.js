import { v2 as cloudinary } from 'cloudinary'
import * as dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const cloudinaryImagesMethod = async (file, folder) => {
return new Promise(resolve => {
  cloudinary.uploader.upload(file, {folder}, (err, res) => {
    if (err) return res.status(500).send('upload image error')
    resolve({
      public_id: res.public_id,
      url: res.secure_url
    })
  })
})
}

const cloudinaryImagesRemove = async (imag ) => {
 await cloudinary.uploader.destroy(imag, (err, res) => {
    if (err) return res.status(500).send('destroy image error')
  })
}

export {cloudinaryImagesMethod, cloudinaryImagesRemove}