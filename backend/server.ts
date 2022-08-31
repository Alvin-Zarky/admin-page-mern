import express, {Application, Request, Response, NextFunction} from "express"
import path from "path"
import dotenv from "dotenv"
import colors from "colors"
import morgan from "morgan"
import userRoute from "./router/userRoute"
import categoryRoute from "./router/categoryRoute"
import contentRoute from "./router/contentRoute"
import databaseConnector from "./config/mongoDb"
import imageUploadRoute from "./router/imageUploadRoute"
import customErrorMiddleware from "./middleware/customErrorMiddleware"

dotenv.config()
databaseConnector()
const app:Application= express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, '/frontend/public/images')))
app.use(morgan('dev'))

app.use('/dev/flutter/api/user', userRoute)
app.use('/dev/flutter/api/category', categoryRoute)
app.use('/dev/flutter/api/content', contentRoute)
app.use('/dev/flutter/api/upload', imageUploadRoute)

//Serve client
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  
  app.get('*', (req:Request, res:Response) =>  {
    res.sendFile(path.resolve(__dirname, '../' ,'frontend', 'build', 'index.html'))
  })
}else{
  app.get('/', async(req:Request, res:Response) =>{
    res.send(`Server API is running...!`)
  })
}

app.use((req:Request, res:Response, next:NextFunction) =>{
  res.send(`Page could not be found with this url~${req.originalUrl}`)
})

app.use(customErrorMiddleware)

const server= app.listen(PORT, () =>{
  console.log(`${colors.yellow(`Server in ${process.env.NODE_ENV} is running on port ${PORT}`)}`)
})

process.on('unhandledRejection', (err, promise) =>{
  console.log(colors.bgRed(`Error Connection ${err}`))
  server.close(() => {process.exit(1)})
})
