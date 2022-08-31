import mongoose, { ConnectOptions } from "mongoose"
import colors from "colors"

const databaseConnector = async () => {
  try{
    const reference= await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    console.log(colors.bgCyan.bold(`Connection Successfully On MongoDb: ${reference.connections[0].host}-${reference.connections[0].name}-${reference.connections[0].port}`))
  }catch(err){
    console.log(colors.bgRed(`Connection errror On MongoDb: ${err}`))
  }
}

export default databaseConnector