import axios from "axios"
import { DataCategory } from "./categorySlice"

const URL= '/dev/flutter/api/category'
const addCategory = async(values:DataCategory, token:string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response= await axios.post(URL, values, config)
  const {data}= response.data
  if(data){
    return data
  }
}
const getCategory= async({keyword='', page=''},token: string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response= await axios.get(`${URL}?search=${keyword}&page=${page}`, config)
  if(response.data){
    return response.data
  }
}
const editCategory= async(values: DataCategory, token:string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response= await axios.put(URL + `/${values._id}`, {name: values.name, slug: values.slug}, config)
  const {data} = response.data
  if(data){
    return data
  }
}
const deleteCategory = async(id:string, token:string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response= await axios.delete(URL + `/${id}`, config)
  const {data}= response.data
  if(data){
    return data
  }
}
const countCategory= async(token: string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(URL + '/all', config)
  if(response.data){
    return response.data
  }
}

const categoryServices={
  addCategory,
  getCategory,
  editCategory,
  deleteCategory,
  countCategory
}
export default categoryServices