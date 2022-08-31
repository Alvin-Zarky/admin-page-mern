import {Request, Response} from "express"
import jsonwebtoken from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../model/UserModel"
import CustomError from "../utility/customErrorClass"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()
const userRegister = asyncHandler(async(req:Request, res:Response) =>{
  const {name, email, password, secretKey} = req.body
  
  if(!name || !email || !password){
    throw new CustomError(`Please input the field`, 400)
  }

  const existName = await User.findOne({"userName": { $regex: new RegExp("^" + name.toLowerCase(), "i") }})
  if(existName){
    throw new CustomError(`Username is already existed`, 400)
  }

  const existEmail = await User.findOne({"userEmail": { $regex: new RegExp("^" + email.toLowerCase(), "i") }})
  if(existEmail){
    throw new CustomError(`Useremail is already existed`, 400)
  }
  
  const hashSalt= await bcrypt.genSalt(10)
  const hashPassword= await bcrypt.hash(password, hashSalt)

  const valuesUser={
    userName: name,
    userEmail: email,
    password: hashPassword,
    userRole: "user",
    isAdmin:false,
    publishedAt: Date.now()
  }
  
  if(secretKey === 'alvindevops'){
    const user= await User.create(valuesUser)
    if(!user){
      throw new CustomError(`User created fail`, 400)
    }
    res.status(200).json({ 
      success:true, 
      data:{
        _id: user._id,
        name: user.userName,
        email: user.userEmail,
        role: user.userRole,
        isAdmin: user.isAdmin,
        createdAt: user.publishedAt,
        jsontoken: userGeneratedToken(user._id)
      }
    })
  }else{
    throw new CustomError(`The secret isn't available for this registration`, 400)
  }

})

const userLogin = asyncHandler(async(req:Request, res: Response) =>{
  const {email, password}= req.body
  if(!email || !password){
    throw new CustomError(`Please input the field`, 400)
  }

  const user = await User.findOne({"userEmail": {$regex: new RegExp("^" + email.toLowerCase(), "i") }})
  if(user){
    if(password && (await bcrypt.compare(password, user.password))){
      const values={
        _id: user._id,
        name: user.userName,
        email: user.userEmail,
        role: user.userRole,
        isAdmin: user.isAdmin,
        createdAt: user.publishedAt,
        jsontoken: userGeneratedToken(user._id)
      }
      res.status(200).json({ success:true, data: values })
    }else{
      throw new CustomError(`Password is incorrect`, 401)
    }
  }else{
    throw new CustomError(`There is no user record here or there is something went wrong`, 401)
  }

})

const userLogOut = asyncHandler(async(req:Request, res:Response) =>{
  
  
  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id not found`, 404)
  }

  const user= await User.findById(req.user.id)
  if(user){
    res.status(200).json({ success:true, message: "User has been log out successfully", data:{
      _id: user._id,
      name: user.userName,
      email: user.userEmail,
      role: user.userRole,
      isAdmin: user.isAdmin,
      createdAt: user.publishedAt
    }})
  }else{
    throw new CustomError(`User does not exist`, 404)
  }

})

const userProfile = asyncHandler(async(req:Request, res:Response) =>{

  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id not found`, 404)
  }

  const user= await User.findById(req.user.id).select('-password')
  if(!user){
    throw new CustomError(`User does not exist`, 401)
  }
  
  const values={
    _id: user._id,
    name: user.userName,
    email: user.userEmail,
    role: user.userRole,
    isAdmin: user.isAdmin,
    createdAt: user.publishedAt
  }
  res.status(200).json({ success:true, data: values })
})

const countAllUser = asyncHandler(async(req:Request, res:Response) =>{
  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id not found`, 404)
  }

  const user= await User.find()
  const count= await User.countDocuments()
  if(!user){
    throw new CustomError(`User not found`, 404)
  }
  res.status(200).json({ success:true, count, data: user })
})

const userGeneratedToken = (id:string | any) =>{
  return jsonwebtoken.sign({id}, `${process.env.JWT_SECRET_KEY}`, {expiresIn: process.env.JWT_EXPIRES_IN})
}

export {
  userRegister,
  userLogin,
  userLogOut,
  userProfile,
  countAllUser
}