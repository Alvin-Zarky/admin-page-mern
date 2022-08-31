import {Request, Response, NextFunction} from "express"

declare global{
  namespace Express{
    interface Response{
      advancedResult: any
    }
  }
}

const advancedResultMiddleware= (model: any, populate :any) => async(req: Request, res: Response, next: NextFunction) =>{

  let data = model.find()
  let count = model.countDocuments()

  if(req.query){
    data= model.find(req.query)
  }
  if(populate){
    data.populate(populate)
  }

  if(req.query.select){
    const selectQuery= (<string>req.query.select).split(',').join(' ')
    data.select(selectQuery)
  }
  if(req.query.sort){
    const sortQuery = (<string>req.query.sort).split(',').join(' ')
    data.sort(sortQuery)
  }
  if(req.query.search){
    const searchKeyword= {
      categoryName:{
        $regex: req.query.search,
        $options: `i`
      },
      contentTitle:{
        $regex: req.query.search,
        $options: `i`
      }
    }
    data= model.find({ ...searchKeyword })
    count = model.countDocuments({ ...searchKeyword })
  }

  const pagination:any= {}
  const countData= await count
  const pages= Number(req.query.page) || 1
  const limit= Number(req.query.limit) || 10
  const start= (pages - 1) * limit
  const end= pages * limit
  const allPages = Math.ceil(countData / limit)
  data.skip(start).limit(limit)
  data.sort({createdAt: -1})
  const result= await data

  if(start > 0){
    pagination.prev={
      page: pages- 1
    }
  }
  if(end < countData){
    pagination.next={
      page: pages + 1
    }
  }

  res.advancedResult= {
    success:true,
    count: countData,
    pages,
    allPages,
    pagination,
    data: result
  }
  next()
}

export {advancedResultMiddleware}