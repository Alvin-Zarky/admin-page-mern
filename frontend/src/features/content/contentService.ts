import axios from "axios"
import { DataContent } from "./contentSlice"

const URL = '/dev/flutter/api/content'
const addContent= async(data: DataContent, token: string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response= await axios.post(URL, data, config)
  const {data:value} = response.data
  if(value){
    return value
  }
}
const getContent = async({search='', pageNumber=''},token:string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(`${URL}?search=${search}&page=${pageNumber}`, config)
  if(response.data){
    return response.data
  }
}
const updateContent= async(value: DataContent, token:string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response= await axios.put(URL + `/${value._id}`, value, config)
  const {data} = response.data
  if(data){
    return data
  }
}
const deleteContent = async(id:string, token:string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response= await axios.delete(URL + `/${id}`, config)
  const {data} = response.data
  if(data){
    return data
  }
}
const countContent = async(token:string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response= await axios.get(URL + '/all', config)
  if(response.data){
    return response.data
  }
}

const contentServices={
  addContent,
  getContent,
  updateContent,
  countContent,
  deleteContent
}
export default contentServices