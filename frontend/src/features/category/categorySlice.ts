import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import categoryServices from "./categoryService";

interface InitialState{
  category: any,
  count: number,
  isLoading:boolean,
  isSuccess:boolean,
  isError:boolean,
  message: any | string
}
export interface DataCategory{
  user?: string,
  userName?: string,
  name?: string,
  slug?: string,
  categoryName?: string,
  _id?:string | any,
  slugUrl?:string
}
export interface DataCategoryTooltip{
  keyword: string,
  page: string
}
const initialState: InitialState={
  category:{data:[]},
  count:0,
  isLoading:false,
  isSuccess:false,
  isError:false,
  message: null
}

export const createCategory= createAsyncThunk(
  'category/add-category',
  async(values:DataCategory, thunkAPI:any) =>{
    try{
      const {jsontoken}= thunkAPI.getState().auth.user
      return await categoryServices.addCategory(values, jsontoken)
    }catch(err:any){
      const error= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getCategory= createAsyncThunk(
  'category/get-category',
  async(data:DataCategoryTooltip, thunkAPI:any) =>{
    try{
      const {jsontoken}= thunkAPI.getState().auth.user
      return await categoryServices.getCategory(data, jsontoken)
    }catch(err:any){
      const error= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateCategory = createAsyncThunk(
  'category/update-category',
  async(values: DataCategory, thunkAPI:any) =>{
    try{
      const {jsontoken}= thunkAPI.getState().auth.user
      return await categoryServices.editCategory(values, jsontoken)
    }catch(err:any){
      const error= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'category/delete-category',
  async(id: string, thunkAPI:any) =>{
    try{
      const {jsontoken} = thunkAPI.getState().auth.user
      return await categoryServices.deleteCategory(id, jsontoken)
    }catch(err:any){
      const error= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const categoryCount = createAsyncThunk(
  'category/count-category',
  async(_, thunkAPI:any) =>{
    try{
      const {jsontoken} = thunkAPI.getState().auth.user
      return await categoryServices.countCategory(jsontoken)
    }catch(err:any){
      const error= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers:{
    reset:(state: InitialState, action: PayloadAction) =>{
      state.category={}
    }
  },
  extraReducers:(builder) => {
    
    builder.addCase(createCategory.pending, (state: InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(createCategory.fulfilled, (state: InitialState, action:PayloadAction) =>{
      state.isLoading=false
      state.category.data.unshift(action.payload)
      state.isSuccess=true
      state.isError=false
    })
    builder.addCase(createCategory.rejected, (state: InitialState, action) =>{
      state.isLoading=false
      state.isError=true
      state.isSuccess=false
      state.message= action.payload      
    })

    builder.addCase(getCategory.pending, (state: InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(getCategory.fulfilled, (state: InitialState, action:PayloadAction) =>{
      state.isLoading=false
      state.category=action.payload
      state.isSuccess=true
      state.isError=false
    })
    builder.addCase(getCategory.rejected, (state: InitialState, action) =>{
      state.isLoading=false
      state.isError=true
      state.isSuccess=false
      state.message= action.payload      
    })

    builder.addCase(updateCategory.pending, (state: InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(updateCategory.fulfilled, (state: InitialState, action:any) =>{
      state.isLoading=false
      state.isSuccess=true
      state.category.data= state.category.data.map((val:DataCategory) => val._id === action.payload._id ? action.payload : val)
      state.isError=false
    })
    builder.addCase(updateCategory.rejected, (state: InitialState, action) =>{
      state.isLoading=false
      state.isError=true
      state.isSuccess=false
      state.message= action.payload      
    })

    builder.addCase(deleteCategory.pending, (state: InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(deleteCategory.fulfilled, (state: InitialState, action:any) =>{
      state.isLoading=false
      state.isSuccess=true
      state.category.data= state.category.data.filter((data:{_id:string}) => data._id !== action.payload._id )
      state.isError=false
    })
    builder.addCase(deleteCategory.rejected, (state: InitialState, action) =>{
      state.isLoading=false
      state.isError=true
      state.isSuccess=false
      state.message= action.payload      
    })

    builder.addCase(categoryCount.pending, (state: InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(categoryCount.fulfilled, (state: InitialState, action:any) =>{
      state.isLoading=false
      state.count= action.payload.count
      state.isSuccess=true
      state.isError=false
    })
    builder.addCase(categoryCount.rejected, (state: InitialState, action) =>{
      state.isLoading=false
      state.isError=true
      state.isSuccess=false
      state.message= action.payload      
    })

  },
})

export default categorySlice.reducer
export const {reset} = categorySlice.actions
