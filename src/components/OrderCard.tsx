import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { getuser, useAppDispatch } from '../redux/store';
import { updateEdit, updateEditId } from '../redux/states/modal';
import supabase from '../utils/supabase';
import { fetchOrders } from '../redux/states/orders';
import { useSelector } from 'react-redux';


const OrderCard: React.FC<{data:any}>=({data})=> {
 
  const userData=useSelector(getuser)
  const dispatch=useAppDispatch();

  return (
    <div className='flex w-full p-4 bg-gray-200 rounded-2xl h-auto  justify-between'>
        <div className='flex flex-col'>
        <h1 className='text-lg'>Order Id: {data.order_id}</h1>
    <h1 className='text-lg'>Name: {data.customer_name}</h1>
    <h1 className='text-lg'>Email: {data.customer_email}</h1>
   
        </div>
        <div className='flex flex-col'>
        <h1 className='text-lg'>Product:{data.product}</h1>
    <h1 className='text-lg'>Quantity: {data.quantity}</h1>
        </div>
        <div className='flex flex-col items-center justify-between'>
        <button className='bg-indigo-600 p-2 text-white rounded-lg' onClick={()=>{
          dispatch(updateEdit(true));
          dispatch(updateEditId(data))
        }}>Edit Order</button>
        <button onClick={async ()=>{
          
const {data:any, error } = await supabase
.from('orders')
.delete()
.eq('order_id', data.order_id)
  
dispatch(fetchOrders(userData?.user.id))
        }}>
        <MdDeleteOutline color='red' size={24}/>
            </button>
        </div>

    </div>
  )
}

export default OrderCard