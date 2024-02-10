import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import UserReducer from './states/user'
import ModalReducer from './states/modal'
import OrderReducer from './states/orders'

export const store=configureStore({
    reducer:{
        user: UserReducer,
        modal: ModalReducer,
        orders: OrderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const getuser= (state: RootState)=> state.user.user
export const getEditStatus=(state:RootState)=>state.modal.edit;
export const getEditId=(state:RootState)=>state.modal.editId;
export const getCreateStatus=(state:RootState)=>state.modal.create;
export const getOrderData=(state:RootState)=>state.orders.orderData
export const orderLoading=(state:RootState)=>state.orders.orderLoading
