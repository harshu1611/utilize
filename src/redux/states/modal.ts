import { createSlice } from "@reduxjs/toolkit";

interface modalStates{
    edit: boolean,
    editId: any | null,
    create:boolean,
}

const initialState={
    edit:false,
    editId: null,
    create: false,
} as modalStates;

const modalSlice= createSlice({
    name:"modal",
    initialState,
    reducers:{
        updateEdit:(state,action)=>{
            state.edit=action.payload;
        },
        updateEditId:(state,action)=>{
            state.editId=action.payload;
        },
        updateCreate:(state,action)=>{
            state.create=action.payload;
        }
    }
  })

  export const {  updateEdit,updateEditId,updateCreate } = modalSlice.actions;
  export default modalSlice.reducer;

