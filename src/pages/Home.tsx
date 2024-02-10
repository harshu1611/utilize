import React, { useState,useEffect } from 'react'
import OrderCard from '../components/OrderCard'
import supabase from '../utils/supabase';
import { useSelector } from "react-redux";
import { getCreateStatus, getEditStatus, getOrderData, getuser, orderLoading } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import { updateUser } from '../redux/states/user';
import UpdateOrder from '../components/UpdateOrder';
import { updateCreate } from '../redux/states/modal';
import CreateOrder from '../components/CreateOrder';
import { fetchOrders, resetOrders } from '../redux/states/orders';
import { Audio } from 'react-loader-spinner'
import Loader from '../components/Loader';




export default function Home() {
  const edit= useSelector(getEditStatus)
  const create= useSelector(getCreateStatus)
  const dispatch = useAppDispatch();
  const loading=useSelector(orderLoading)
    const userData=useSelector(getuser)
    // const [orderList,setOrderList]=useState<any>([])

const orderList=useSelector(getOrderData)


// console.log(userData.user.id)
   
  useEffect(() => {
   dispatch(fetchOrders(userData?.user.id))
  }, [])
  

  return (
    <div className='flex p-2'>
     
<div className={`flex flex-col p-4 w-full ${edit || create? `opacity-50`:``}`}>
        <div className='flex flex-row space-y-1'>
            <div className='flex flex-col w-full'>
            <h1 className='text-indigo-600 text-xl'>Name: {userData?.user.user_metadata.full_name}</h1>
            <h1 className='text-indigo-600 text-xl'>Email: {userData?.user.user_metadata.email}</h1>
            <button className='bg-indigo-600 p-2 text-white w-[20%] rounded-lg' onClick={()=>{
              dispatch(updateUser(null))
              dispatch(resetOrders())
    
              supabase.auth.signOut()
              
              }}>Log Out</button>
            </div>

<button className='bg-indigo-600 p-2 text-white h-10 w-[30%] rounded-lg' onClick={()=>{
              dispatch(updateCreate(true))
              }}>+ Create New Order</button>
        </div>
        <div className=' flex  items-center justify-center flex-col space-y-2'>
          <h1 className='text-2xl'>My Orders</h1>
          {loading ? 
    <Loader/>
      :
          <div className='grid grid-cols-2 gap-4 w-full'>
            {orderList?.map((data:any)=>{
                return(
                  
            <OrderCard data={data}/>

                )
            })}
           

          </div>
}
        </div>
        
    </div>
    
 
    {edit? 
    <UpdateOrder/>
    :
    ''}
     {create? 
    <CreateOrder/>
    :
    ''}
    </div>
   
  )
}
