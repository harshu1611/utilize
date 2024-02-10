import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";

interface OrderState{
    orderData: null | any[],
    orderLoading: null | boolean
}

const initialState={
    orderData: null,
    orderLoading: true
} as OrderState

export const fetchOrders=createAsyncThunk(
    "orders/fetchOrders",
    async(id:any)=>{
        let { data: orders, error } = await supabase
        .from('orders')
        .select("*")
        .order('id',{ascending:true})
      
      if(error){
        throw error
      }

      return orders as any[]
           
    }
)

const orderSlice= createSlice({
    name:"orders",
    initialState,
    reducers:{
        resetOrders: (state) => {
            state.orderData = null;
            state.orderLoading=false;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state, { payload }) => {
          state.orderLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
          // const data=
          state.orderData = payload;
          // console.log(typeof(payload));
          state.orderLoading = false;
        });
    }
})
export const {resetOrders} = orderSlice.actions
export default orderSlice.reducer;