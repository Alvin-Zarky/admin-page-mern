import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  userName:{
    type:String,
    required:[true, 'Please input the username']
  },
  userEmail:{
    type: String,
    required:[true, 'Please input the useremail']
  },
  password:{
    type:String,
    required:[true, 'Please input the password']
  },
  userRole:{
    type: String,
    enum:['user','admin'],
    default:'user'
  },
  isAdmin:{
    type:Boolean,
    default: false
  },
  publishedAt:{
    type:Date,
    default: Date.now()
  }
}, {timestamps:true})

const User = mongoose.model('User', UserModel)
export default User