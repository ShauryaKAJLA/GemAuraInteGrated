import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Orders = () => {
  const [Orders,setOrders]=useState(null);
  useEffect(()=>{
    (async ()=>{
        try {
          const response=await axios.post('http://localhost:3000/users/getOrders',{},{withCredentials:true})
          setOrders(response.data.data)
          console.log(response)
        } catch (error) {
          console.log(error)
        }
    })();
  },[])
  return (
    <div className='flex flex-col items-center w-[100vw] h-[100vh] overflow-y-scroll sm:text-base text-sm'>
      <div className='border-b-2 border-b-[#662B2B] w-[90vw] text-xl my-2 pb-3 font-semibold text-[#662B2B]'>Order History</div>
      <div className='w-[90vw] my-2  flex flex-col gap-10 pb-6 items-center'>
            {Orders&&Orders.map((item,index)=> <div className={`flex flex-col gap-3 border-l-8 ${item.status=="completed"?'border-l-green-300':'border-l-red-500'} p-1 rounded-2xl bg-[#b8b8b842] w-[300px] sm:w-[500px] lg:w-[600px] h-[350px] `}>
                <div className={` ${item.status=="completed"?'text-green-500':'text-red-600'}  list-item ml-5 `}>  {item.status}</div>
                <div className='bg-white gap-2 justify-center p-2 flex flex-col w-[99%] h-[125px] rounded-xl'>
                        <div>Order id : {item._id}</div>
                        <div>Total Quantity : {item.totalQnt}</div>
                        <div>Sub total: {item.totalPrice}</div>
                </div>
                <div className='bg-white gap-4 p-2 flex flex-col w-[99%] h-[160px] rounded-xl overflow-x-hidden overflow-y-scroll'>
                      <div>Products: </div>
                      {Orders&&Orders[index].products?.map((pro,ind)=><div className='flex gap-3 items-center sm:text-base text-xs'>
                        <div className='sm:w-[100px] w-[80px]  sm:h-[80px] h-[70px] rounded-lg overflow-hidden'>
                          <img src={pro.product.images[0]} className='object-cover sm:w-[100px] w-[80px]  sm:h-[80px] h-[70px]'/>
                        </div>
                        <div className='flex flex-col '>
                          <div>Name : {pro.product.name}</div>
                          <div>Qnt : {pro.quantity}</div>
                          <div>Price : {pro.product.Gem.totalPrice +
                          pro.product.metal.pricePerGram * pro.product.metal.weightInGram}</div>
                          <div>Total Price : {(pro.product.Gem.totalPrice +
                          pro.product.metal.pricePerGram * pro.product.metal.weightInGram)*pro.quantity}</div>
                        </div>
                      </div>)}
                  
                </div>
            </div> )}
      </div>
    </div>
  )
}

export default Orders


{/* <div className='flex flex-col gap-3 border-l-8 border-l-green-300 p-1 rounded-2xl bg-[#b8b8b842] w-[300px] sm:w-[500px] lg:w-[600px] h-[350px] '>
                <div className='text-green-500 list-item ml-5 '>  Completed</div>
                <div className='bg-white p-2 flex flex-col w-[99%] h-[125px] rounded-xl'>
                        <div>Order id : </div>
                        <div>Total Quantity : </div>
                        <div>Sub total: </div>
                </div>
                <div className='bg-white gap-4 p-2 flex flex-col w-[99%] h-[160px] rounded-xl overflow-y-scroll'>
                      <div>Products: </div>
                      <div className='flex gap-3 items-center'>
                        <div className='w-[100px] border h-[80px] rounded-lg overflow-hidden border-black  '></div>
                        <div className='flex flex-col text-sm'>
                          <div>name</div>
                          <div>Qnt: </div>
                          <div>Price: </div>
                          <div>Total Price: </div>
                        </div>
                      </div>
                  
                </div>
            </div> */}