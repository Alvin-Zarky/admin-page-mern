import axios from "axios"
import { DataUser } from "./authSlice"

const URL= '/dev/flutter/api/user'
const userSignUp = async (values: DataUser) => {
  const response= await axios.post(URL + '/register', values)
  const {data} = response.data
  if(data){
    localStorage.setItem('user', JSON.stringify(data))
    return data
  }
}
const userLogIn = async(values: DataUser) =>{
  const response= await axios.post(URL + '/login', values)
  const {data} = response.data
  if(data){
    localStorage.setItem('user', JSON.stringify(data))
    return data
  }
}
const userLogOut= async(token:string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response= await axios.get(URL + '/logout', config)
  const {data} = response.data
  if(data){
    localStorage.removeItem('user')
    return data
  }
}
const getAllUser = async(token: string) =>{
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(URL + '/all', config)
  if(response){
    return response.data
  }
}

const authServices={
  userSignUp,
  userLogIn,
  userLogOut,
  getAllUser
}
export default authServices