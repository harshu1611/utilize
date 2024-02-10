import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: any | null;
  }
  
  const initialState = {
    user: null,
  } as UserState;

  const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        updateUser:(state,action)=>{
            state.user=action.payload;
        }
    }
  })

  export const {  updateUser } = userSlice.actions;
  export default userSlice.reducer;
