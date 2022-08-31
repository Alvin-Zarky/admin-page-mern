import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import authServices from "./authService";

export interface InitialState{
  user: any,
  count: number,
  isLoading:boolean,
  isSuccess:boolean,
  isError:boolean,
  message: any | string
}
export interface DataUser{
  name?:string,
  email: string,
  password:string,
  role?: string,
  isAdmin?:boolean,
  secretKey?: string
}

const getUserFromLocalStorage= localStorage.getItem('user')
const initialState: InitialState={
  user: getUserFromLocalStorage ? JSON.parse(getUserFromLocalStorage) : null,
  count:0,
  isLoading:false,
  isSuccess:false,
  isError:false,
  message: null
}

export const authRegister= createAsyncThunk(
  'auth/user-register',
  async(data:DataUser, thunkAPI) =>{
    try{
      return await authServices.userSignUp(data)
    }catch(err:any){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authLogIn= createAsyncThunk(
  'auth/user-login',
  async(data:DataUser, thunkAPI) =>{
    try{
      return await authServices.userLogIn(data)
    }catch(err:any){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authLogOut = createAsyncThunk(
  'auth/user-logout',
  async (_, thunkAPI:any) => {
    try{
      const {jsontoken}= thunkAPI.getState().auth.user
      return await authServices.userLogOut(jsontoken)
    }catch(err:any){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getAllUser= createAsyncThunk(
  'auth/all-user-count',
  async(_, thunkAPI:any) =>{
    try{
      const {jsontoken}= thunkAPI.getState().auth.user
      return await authServices.getAllUser(jsontoken)
    }catch(err:any){
      const message= (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const authSlice= createSlice({
  name: 'auth',
  initialState,
  reducers:{
    clear: (state: InitialState, action:PayloadAction) =>{
      state.isError=false
      state.message=''
    }
  },
  extraReducers: (builder) =>{
    builder.addCase(authRegister.pending, (state: InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(authRegister.fulfilled, (state: InitialState, action: PayloadAction) =>{
      state.isLoading=false
      state.user= action.payload
      state.isError=false
      state.isSuccess=true
    })
    builder.addCase(authRegister.rejected, (state: InitialState, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    builder.addCase(authLogIn.pending, (state:InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(authLogIn.fulfilled, (state: InitialState, action: PayloadAction) =>{
      state.isLoading=false
      state.user= action.payload
      state.isSuccess=true
      state.isError=false
    })
    builder.addCase(authLogIn.rejected, (state: InitialState, action) =>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message= action.payload
    })

    builder.addCase(authLogOut.pending, (state:InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(authLogOut.fulfilled, (state: InitialState, action: PayloadAction) =>{
      state.isLoading=false
      state.user= null
      state.isError=false
    })
    builder.addCase(authLogOut.rejected, (state: InitialState, action) =>{
      state.isLoading=false
      state.isError=true
      state.message= action.payload
    })

    builder.addCase(getAllUser.pending, (state:InitialState, action:PayloadAction) =>{
      state.isLoading=true
    })
    builder.addCase(getAllUser.fulfilled, (state: InitialState, action) =>{
      state.isLoading=false
      state.count= action.payload.count
      state.isError=false
    })
    builder.addCase(getAllUser.rejected, (state: InitialState, action) =>{
      state.isLoading=false
      state.isError=true
      state.message= action.payload
    })
  }
})

export default authSlice.reducer
export const {clear} = authSlice.actions