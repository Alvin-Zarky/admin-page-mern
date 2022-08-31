import { Request, Response, NextFunction} from "express"
import jsonwebtoken from "jsonwebtoken"
import User from "../model/UserModel"
import asyncHandler from "express-async-handler"
import CustomError from "../utility/customErrorClass"

declare global{
  namespace Express{
    interface Request{
      user: any
    }
  }
}
interface Decoded{
  id:string
}

const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>{
  let token
  try{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1]
      const decoded= jsonwebtoken.verify(token, `${process.env.JWT_SECRET_KEY}`) as Decoded
      req.user = await User.findById(decoded.id).select('-password')
    }
  }catch(err){
    throw new CustomError(`Auth token not authorize`, 401)
  }

  if(!token){
    throw new CustomError(`No Auth Token`, 401)
  }

  next()
})

export {authMiddleware}