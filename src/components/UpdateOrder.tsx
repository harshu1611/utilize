import React, {useState} from 'react'
import { getEditId, getuser, useAppDispatch } from '../redux/store'
import { updateEdit, updateEditId } from '../redux/states/modal';
import { useSelector } from 'react-redux';
import supabase from '../utils/supabase';
import { fetchOrders } from '../redux/states/orders';

export default function UpdateOrder() {
    const dispatch=useAppDispatch();
    const userData=useSelector(getuser)
    const editDetails=useSelector(getEditId);
    const orderId= editDetails.order_id
    const [name,setName]=useState(editDetails.customer_name)
    const [email,setEmail]= useState(editDetails.customer_email)
    const [product,setProduct] =useState(editDetails.product)
    const [qty,setQty]= useState(editDetails.quantity)

    // console.log(editDetails)
    const update=async()=>{
        
        const { data, error } = await supabase
        .from('orders')
       
        .update({ customer_name: name,
            customer_email:email,
            product:product,
            quantity: qty
        })
        .eq('order_id', orderId)
        

        // console.log(error)

        
    }
  return (
    <div className='fixed left-[25%] top-[25%] inset-0 overflow-y-auto flex flex-col self-center items-center justify-center z-50 h-[50%] w-[50%] bg-white p-4 rounded-xl border-2 border-black '>
        <div className='flex flex-row justify-around w-full absolute top-2'>
        <h1 className='font-semibold text-indigo-600 text-xl '>Edit Order</h1>
        <button>
        <h1 className='font-semibold text-indigo-600 text-md absolute right-3 underline' onClick={()=>{
            dispatch(updateEdit(false));
            dispatch(updateEditId(null));
        }}>Close </h1>
        </button>
        </div>
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
      
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

          value={email}
          onChange={(e:any)=>setEmail(e.target.value)}
        />
          </div>
          <div>
          <label  className="block text-sm font-medium leading-6 text-gray-900">
        Name
      </label>
          <input
         
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          
          
          value={name}
          onChange={(e:any)=>setName(e.target.value)}
        />
          </div>
          <div>
          <label  className="block text-sm font-medium leading-6 text-gray-900">
        Product
      </label>
          <select
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={product} onChange={(e:any)=>setProduct(e.target.value)}
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
        />
          </div>
        <button className='bg-indigo-600 text-white font-semibold items-center justify-center self-center rounded-xl h-10 w-[40%]' onClick={()=>{
            update();
            dispatch(updateEdit(false));
            dispatch(updateEditId(null));
            dispatch(fetchOrders(userData?.user.id))
        }}>
            <h1>Update Order</h1>
        </button>
          </div>
          
        </div>
  )
}
