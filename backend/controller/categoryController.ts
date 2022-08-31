import {Request, Response, NextFunction} from "express"
import Category from "../model/CategoryModel";
import asyncHandler from "express-async-handler" 
import CustomError from "../utility/customErrorClass";

const createCategory = asyncHandler(async(req: Request, res: Response, next: NextFunction) =>{
  
  const {name, slug} = req.body
  if(!req.user){
    throw new CustomError(`User not found `, 404)
  }
  if(!req.user.id){
    throw new CustomError(`User id not exist`, 404)
  }

  if(!name || !slug){
    throw new CustomError(`Please input the field`, 400)
  }
  const category = await Category.create({
    user: req.user._id,
    userName: req.user.userName,
    categoryName: name,
    slugUrl: slug,
    publishedAt: Date.now()
  })
  if(!category){
    throw new CustomError(`Category created failed`, 400)
  }
  res.status(201).json({ success:true, data: category })

})

const collectCategory = asyncHandler(async (req: Request, res:Response, next: NextFunction) =>{
  
  if(!req.user){
    throw new CustomError(`User not found `, 404)
  }
  if(!req.user.id){
    throw new CustomError(`User id not exist`, 404)
  }
  
  if(!res.advancedResult.data || res.advancedResult.data.length===0){
    throw new CustomError(`Data category not found`, 404)
  }
  res.status(200).json(res.advancedResult)

})

const updateCategory= asyncHandler(async(req: Request, res: Response, next:NextFunction) =>{

  const {name, slug}= req.body
  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id does not exist`, 404)
  }

  const category= await Category.findByIdAndUpdate(req.params.id, {
    categoryName: name,
    slugUrl: slug
  }, {new:true, runValidators:true})
  if(!category){
    throw new CustomError(`Category update not found`, 404)
  }

  res.status(200).json({ success:true, data: category })

})

const deleteCategory = asyncHandler(async(req: Request, res:Response, next: NextFunction) =>{

  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id does not exist`, 404)
  }

  const category= await Category.findByIdAndDelete(req.params.id)
  if(!category){
    throw new CustomError(`Category delete not found`, 404)
  }
  res.status(200).json({ success:true, data: category })

})

const countAllCategory = asyncHandler(async(req:Request, res: Response) =>{
  if(!req.user){
    throw new CustomError(`User not authorize`, 401)
  }
  if(!req.user.id){
    throw new CustomError(`User id does not exist`, 404)
  }
  const category= await Category.countDocuments()
  res.status(200).json({ success:true, count: category })
})

export {
  createCategory,
  collectCategory,
  updateCategory,
  deleteCategory,
  countAllCategory
}