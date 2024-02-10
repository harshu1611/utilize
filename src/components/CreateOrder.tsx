import React, {useState,useEffect} from 'react'
import { getEditId, getuser, useAppDispatch } from '../redux/store'
import { updateCreate, updateEdit, updateEditId } from '../redux/states/modal';
import { useSelector } from 'react-redux';
import supabase from '../utils/supabase';
import {v4 as uuid} from 'uuid'
import { fetchOrders } from '../redux/states/orders';
export default function CreateOrder() {
    const dispatch=useAppDispatch();
    const[orderId,setOrderId]=useState<any>()
    const [name,setName]=useState()
    const [email,setEmail]= useState()
    const [product,setProduct] =useState()
    const [qty,setQty]= useState()
    const userData=useSelector(getuser)

    // console.log(editDetails)
    const userId=userData?.user.id
    useEffect(() => {
        const newUuid = uuid()
        setOrderId(newUuid)
    }, [])
    
    const create=async()=>{
const { data, error } = await supabase
.from('orders')
.insert([
  { order_id: orderId, customer_name: name, customer_email: email, product:product, quantity: qty, userId:userId},
])
.select()

    }
    
  const createFn=()=>{
   (name && email && qty) ? create() : <></>
  dispatch(updateCreate(false))
  dispatch(fetchOrders(userData?.user.id))
  
  }  
  return (
    <div className='fixed left-[25%] top-[25%] inset-0 overflow-y-auto flex flex-col self-center items-center justify-center z-50 h-[50%] w-[50%] bg-white p-4 rounded-xl border-2 border-black '>
        <div className='flex flex-row justify-around w-full absolute top-2'>
        <h1 className='font-semibold text-indigo-600 text-xl '>Create New Order</h1>
        <button>
        <h1 className='font-semibold text-indigo-600 text-md absolute right-3 underline' onClick={()=>{
            dispatch(updateCreate(false));
    
        }}>Close </h1>
        </button>
       
        </div>
        <form className='w-full'>
          <div className='grid grid-cols-2 gap-3 w-full'>
           
          <div>
           
          <div className='w-full flex flex-row justify-between'>
           <label htmlFor="orderId" className="block text-sm font-medium leading-6 text-gray-900">
        Order Id
      </label>
      <label htmlFor="orderId" className="block text-sm font-xs leading-6 text-red-500">
        *Order Id cannot be edited
      </label>
           </div>
          <input

          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
          placeholder={orderId} disabled
         
          value={orderId}
        />
          </div>
          <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
        Email
      </label>
          <input
      type='email'
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

          value={email}
          onChange={(e:any)=>setEmail(e.target.value)}
          required
        />
          </div>
          <div>
          <label  className="block text-sm font-medium leading-6 text-gray-900">
        Name
      </label>
          <input
         type='text'
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          
          
          value={name}
          onChange={(e:any)=>setName(e.target.value)}
          required
        />
          </div>
          <div>
          <label  className="block text-sm font-medium leading-6 text-gray-900">
        Product
      </label>
          <select
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={product} onChange={(e:any)=>setProduct(e.target.value)} required
        >
            <option>Product 1</option>
            <option>Product 2</option>
            <option>Product 3</option>

            </select>
          </div>
          <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
        Quantity
      </label>
          <input
         type='number'
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    
          value={qty}
          onChange={(e:any)=>setQty(e.target.value)}
          required
        />
          </div>
        <button className='bg-indigo-600 text-white font-semibold items-center justify-center self-center rounded-xl h-10 w-[40%]' onClick={()=>{
          createFn()
        }} type='submit'>
            <h1>Create Order</h1>
        </button>
       
          </div>
          </form>
        </div>
  )
}

