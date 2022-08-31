import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { SearchParam } from "../../screens/add-content";
import contentServices from "./contentService";

interface InitialState{
  content:any,
  count:number,
  isLoading:boolean,
  isError:boolean,
  isSuccess:boolean,
  message: any
}
export interface DataContent{
  category?: string,
  title?: string,
  detail?:string,
  image?: string,
  contentTitle?: string,
  contentDescription?:string,
  userName?:string,
  _id?:string,
  picture?:string
}
const initialState:InitialState={
  content:{ data:[] },
  count:0,
  isLoading:false,
  isError:false,
  isSuccess:false,
  message: null
}

export const createContent = createAsyncThunk(
  'content/add-content',
  async(values:DataContent, thunkAPI:any) =>{
    try{
      const {jsontoken} = thunkAPI.getState().auth.user
      return await contentServices.addContent(values, jsontoken)
    }catch(err:any){
      const error= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getContent = createAsyncThunk(
  'content/get-content',
  async (values:SearchParam, thunkAPI:any) => {
    try{
      const {jsontoken:token} = thunkAPI.getState().auth.user
      return await contentServices.getContent(values, token) 
    }catch(err:any){
      const error= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const editContent= createAsyncThunk(
  'content/update-content',
  async(values: DataContent, thunkAPI:any) =>{
    try{
      const {jsontoken} = thunkAPI.getState().auth.user
      return await contentServices.updateContent(values, jsontoken)
    }catch(err:any){
      const error= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteContent = createAsyncThunk(
  'content/delete-content',
  async(id:string, thunkAPI:any) =>{
    try{
      const {jsontoken: token}= thunkAPI.getState().auth.user
      return await contentServices.deleteContent(id, token)
    }catch(err:any){
      const error= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const contentCount= createAsyncThunk(
  'content/count-content',
  async(_, thunkAPI:any) =>{
    try{
      const {jsontoken:token} = thunkAPI.getState().auth.user
      return await contentServices.countContent(token)
    }catch(err:any){
      const error= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers:{
    reset:(state: InitialState, action: PayloadAction) =>{
      state.content={}
    }
  },
  extraReducers:(builder) =>{

    builder.addCase(createContent.pending, (state:InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(createContent.fulfilled, (state:InitialState, action:PayloadAction) =>{
      state.isLoading=false
      state.content.data.unshift(action.payload)
      state.isSuccess=true
      state.isError=false
    })
    builder.addCase(createContent.rejected, (state:InitialState, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    builder.addCase(getContent.pending, (state:InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(getContent.fulfilled, (state:InitialState, action:PayloadAction) =>{
      state.isLoading=false
      state.content= action.payload
      state.isSuccess=true
      state.isError=false
      state.message=null
    })
    builder.addCase(getContent.rejected, (state:InitialState, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    builder.addCase(editContent.pending, (state:InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(editContent.fulfilled, (state:InitialState, action:any) =>{
      state.isLoading=false
      state.isSuccess=true
      state.content.data= state.content.data.map((val:DataContent) => val._id === action.payload._id ? action.payload: val)
      state.isError=false
    })
    builder.addCase(editContent.rejected, (state:InitialState, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    builder.addCase(deleteContent.pending, (state:InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(deleteContent.fulfilled, (state:InitialState, action:any) =>{
      state.isLoading=false
      state.isSuccess=true
      state.content.data= state.content.data.filter((val: DataContent) => val._id !== action.payload._id)
      state.isError=false
    })
    builder.addCase(deleteContent.rejected, (state:InitialState, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    builder.addCase(contentCount.pending, (state:InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(contentCount.fulfilled, (state:InitialState, action:any) =>{
      state.isLoading=false
      state.count= action.payload.count
      state.isSuccess=true
      state.isError=false
    })
    builder.addCase(contentCount.rejected, (state:InitialState, action:any) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })
    
  }
})

export const {reset}= contentSlice.actions
export default contentSlice.reducer