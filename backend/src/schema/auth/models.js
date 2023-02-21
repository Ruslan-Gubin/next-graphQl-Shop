import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
    }, 
    role: {
      type: String,
      default: 'Guest',
    },
    image: {
      public_id: {
        type: String, 
      },
      url: {
        type: String,
      },
    }, 
    comments: {
      type: [String],
      default: [],
    },
    passwordHash: { 
      type: String,
      require: true,
    }, 
    
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
