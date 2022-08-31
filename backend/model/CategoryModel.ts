import mongoose from "mongoose";

const CategoryModel= new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required:[true, 'Please input the user id'],
    ref:'User'
  },
  userName:{
    type: String,
    required:[true, 'Please input the username']
  },
  categoryName:{
    type: String,
    required:[true, 'Please input the category name']
  },
  slugUrl:{
    type: String,
    required:[true, 'Please input the slug url']
  },
  publishedAt:{
    type: Date,
    default: Date.now()
  }
}, {timestamps:true})

const Category = mongoose.model('Category', CategoryModel)
export default Category