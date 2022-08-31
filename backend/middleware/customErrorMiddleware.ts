import { ErrorRequestHandler } from "express"
import CustomError from "../utility/customErrorClass"

const customErrorMiddleware:ErrorRequestHandler = (err, req, res, next) =>{

  let error= {...err}
  error.message= err.message
  error.stack= err.stack
  error.statusCode= err.statusCode
  
  if(err.name === 'CastError'){
    error= new CustomError(`Couldn't found data with this id ~${err.value}`, 404)
    error.statusCode= 404
  }
  if(err.name === 'ValidationError'){
    const message= Object.values(err.errors).map((val:any) => val.message)
    error= new CustomError(`${message}`, 400)
    error.statusCode=400
  }
  if(err.name === 11000){
    error= new CustomError(`Douplicate field entering data`, 400)
    error.statusCode= 400
  }

  const statusCode= err.statusCode || error.statusCode || 500
  const message = error.message || 'Internal Server Error'
  res.status(statusCode).json({
    success:false,
    message,
    stack: process.env.NODE_ENV==='development' ? err.stack : null
  })

}

export default customErrorMiddleware