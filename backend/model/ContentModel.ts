import mongoose from "mongoose";

const ContentModel= new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required:[true, 'Please input the user id'],
    ref:'User'
  },
  userName:{
    type: String,
    required:[true, 'Please input the username']
  },
  category:{
    type: String,
    required:[true, 'Please input the category type'],
  },
  contentTitle:{
    type: String,
    required:[true, 'Please input the title']
  },
  contentDescription:{
    type: String,
    required:[true, 'Please input the description']
  },
  picture:{
    type: String,
    required:[true, 'Please upload the image']
  },
  publishedAt:{
    type:Date,
    default:Date.now()
  }
}, {timestamps:true})

const Content= mongoose.model('Content', ContentModel)
export default Content