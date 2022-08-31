import {Request, Response, NextFunction} from "express"
import Content from "../model/ContentModel";
import asyncHandler from "express-async-handler"
import CustomError from "../utility/customErrorClass";

const createContent = asyncHandler(async(req: Request, res: Response, next:NextFunction) =>{
  const { category, title, detail, image } = req.body

  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id not found`, 404)
  }
  const content= await Content.create({
    user: req.user.id,
    userName: req.user.userName,
    category,
    contentTitle: title,
    contentDescription:detail,
    picture: image,
    publishedAt: Date.now()
  })
  if(!content){
    throw new CustomError(`Create content failed`, 400)
  }
  res.status(201).json({ success:true, data: content })

})

const getContent = asyncHandler(async(req: Request, res: Response, next:NextFunction) =>{

  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id not found`, 404)
  }

  if(!res.advancedResult.data || res.advancedResult.data.length===0){
    throw new CustomError(`Data content not found`, 404)
  }
  res.status(200).json(res.advancedResult)
 
})

const getContentDetail= asyncHandler(async(req:Request, res: Response, next:NextFunction) =>{
  
  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id not found`, 404)
  }
  
  const content= await Content.findById(req.params.id)
  if(!content){
    throw new CustomError(`Content detail not found`, 404)
  }
  res.status(200).json({ success:true, data: content })
})

const updateContent = asyncHandler(async(req: Request, res: Response, next:NextFunction) =>{

  const {category, title, detail, image} = req.body
  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id not found`, 404)
  }
  const content= await Content.findByIdAndUpdate(req.params.id, {
    category,
    contentTitle: title,
    contentDescription: detail,
    picture: image
  }, {new:true, runValidators:true})
  if(!content){
    throw new CustomError(`Content not found`, 404)
  }
  res.status(200).json({ success:true, data: content })
})

const deleteContent = asyncHandler(async(req: Request, res: Response, next:NextFunction) =>{

  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id not found`, 404)
  }
  const content = await Content.findById(req.params.id)
  if(!content){
    throw new CustomError(`Content not found`, 404)
  }
  await content.remove()
  res.status(200).json({ success:true, data: content })
})

const countAllContent = asyncHandler(async(req:Request, res: Response) =>{
  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id does not exist`, 404)
  }
  
  const content= await Content.countDocuments()
  res.status(200).json({ success:true, count: content })
})

export {
  createContent,
  getContent,
  getContentDetail,
  updateContent,
  deleteContent,
  countAllContent
}