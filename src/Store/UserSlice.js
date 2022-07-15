import { createSlice } from '@reduxjs/toolkit'

const initialData = {
  user:null
}

export const UserSlice = createSlice({
  name: 'user',
  initialState:initialData,
  reducers: {
    login: (state,action)=>{
      state.user= action.payload;
    },
    logout: (state) =>{
      state.user = null
    },
    signup:(state,action)=>{
      state.user = action.payload
    }
  },
})

export const { login,logout,signup} = UserSlice.actions

export const selectUser = (state) => state.user.user

export default UserSlice.reducer