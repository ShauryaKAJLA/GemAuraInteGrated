import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { userCart } from "../cart/CartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const Profile = () => {
  const token = localStorage.getItem('token')
  const dispatch=useDispatch();
  useEffect(()=>{
    (async()=>{
        try{
            const response = await axios.get('http://localhost:5000/cart/',{
              params:{
                token
              }
            })
            dispatch(userCart(response.data.cart))
            
        }catch(err){
          console.log(err)
        }
    })()
  },[])

  // to get user basic details
  const [UserData , setUserData] = useState(null)
  useEffect(()=>{
    (async()=>{
      try{
      const response = await axios.get('http://localhost:5000/profile',{
        params:{
          token
        }
      })
      console.log('user',{response})
      if(response.data.success === true)
        setUserData(response.data.userDetails)
      }catch(err){
        console.log("ERR : ",err)
      }
    })()
  },[])


  // to get user currentOrders data
  const [currentOrderItems , setCurrentOrderItems] = useState(null)
  useEffect(()=>{
    (async()=>{
      try{
        const response = await axios.get('http://localhost:5000/currentOrder',{
          params:{
            token,
          }
        })
        console.log({response})
        if(response.data.success===true)
          setCurrentOrderItems(response.data.currentOrders)

      }catch(err){
        console.log("ERROR : ",err)
      }
    })()
  },[])

  const [display, setDisplay] = useState(1);
  const printdot = () => {
    let str = '';
    for (let i = 1; i <= UserData.passwordLength; i++) {
      str += '* ';
    }
    return str;
  }

 
  return (
     
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
        <div className="md:text-3xl text-slate-500 font-semiboldpx-2 ">Your Profile</div>
    <div className="h-[90vh] flex w-[100vw] justify-center items-center">
      <div className="flex flex-col  sm:text-base text-sm gap-y-5 min-h-[70vh] ">
        <div onClick={()=>setDisplay(1)} className={`${display==1&&"bg-[#d9eafc]"} min-h-[10vh] flex justify-center items-center sm:w-[30vw] w-[30vw] `}>Details</div>
        <div onClick={()=>setDisplay(0)} className={`${display==0&&"bg-[#d9eafc]"} min-h-[10vh] flex justify-center items-center sm:w-[30vw] w-[30vw] `}>Current Orders</div>
      </div>
      <div>
        {UserData && display == 1 && <div className=" flex flex-col  sm:text-xl text-sm  gap-y-5 min-h-[70vh] ">
          <div  className="px-2 flex gap-2 bg-slate-200 min-h-[10vh] items-center rounded sm:w-[60vw] w-[70vw] justify-between">
           <div className="flex gap-4 h-[100%]  items-center"> <div><FaRegUser /> </div>
            <div>{UserData.username}</div>
            </div>
            

          </div>
          <div className="px-2 flex gap-2 bg-slate-200 min-h-[10vh] items-center justify-between rounded sm:w-[60vw] w-[70vw] ">
          <div className="flex gap-4 h-[100%]  items-center">  <div><FaPhoneAlt /> </div>
            <div>{UserData.phone}</div></div>
            

          </div>
          <div className="px-2 flex gap-2 bg-slate-200 min-h-[10vh] items-center rounded sm:w-[60vw] w-[70vw] ">
            <div className="h-[100%]  items-center"><IoIosMail /> </div>
            <div>{UserData.email}</div>
            
          </div>
          <div className="px-2 flex  gap-2 bg-slate-200 min-h-[10vh] items-center justify-between rounded sm:w-[60vw] w-[70vw] ">
          <div className="flex gap-4 h-[100%]  items-center">   <div>< RiLockPasswordFill /> </div>
            <div>{printdot()}</div></div>
            

          </div>
          <div className="px-2 flex gap-2 bg-slate-200 min-h-[10vh] justify-between items-center rounded sm:w-[60vw] w-[70vw] ">
          <div className="flex gap-4 w-[80%] h-[100%]  items-center py-5 "><div>< FaAddressCard /> </div>
            <div className="w-[100%]">{UserData.address}</div></div>
            
          </div>

        </div>}
        {display == 0 && <div className=" flex   sm:text-lg text-xs  gap-5 h-[70vh] overflow-y-auto overflow-x-hidden sm:w-[60vw] w-[70vw] flex-wrap justify-center">
          {currentOrderItems && currentOrderItems.map((item, index) => 
          <div key={index} className="bg-slate-300 w-[300px] h-[50vh] rounded-md shadow-md  items-center flex flex-col text-gray-900 overflow-y-auto overflow-x-hidden">
            {/* <div className="flex w-[80%] gap-4">
             <div className="w-[70px]">id: </div> <div className="w-[150px]">{item._id}</div>
            </div> */}
            <div className="flex w-[80%] gap-4">
            <div className="w-[70px]">Quantity: </div>  <div className="w-[150px]">{item.quantity}</div>
            </div>
            <div className="flex w-[80%] gap-4">
             <div className="w-[70px]">Price: </div> <div className="w-[150px]">&#8377; {item.price}</div>
            </div>
            <div className="flex w-[80%] gap-4">
             <div  className="w-[70px]">Status: </div> <div className="w-[150px]">{item.status==0&&"Pending"}
                                      {item.status==1&&"In Progress"}</div>
            </div>
            <div className="flex w-[80%] gap-4">
             <div className="w-[70px] ">Address: </div> <div className="w-[150px]"> {item.addressDelivery}</div>
            </div>
            <div className="flex flex-col w-[80%] my-5">
              <div className="my-2">Ordered Products</div>
              <div className="flex flex-col gap-y-5">
              {item.items.map((i, ind) => <div key={ind} className="w-[80%]" >
                <Link to={`/productInfo/${i.product._id}`}>
                  <div className="flex  gap-4">
                    <div className="w-[50px]">Name: </div>
                    <div className="w-[190px] ">{i.product.name}</div>

                  </div>
                  <div className="flex  gap-4 ">
                    <div>Product Quantity: </div>
                    <div >{i.quantity}</div>
                  </div>
                </Link>
              </div>)}
              </div>
            </div>
            
          </div>)
          }
        </div>}
                   </div>
    </div>
    </div>
  );
};

export default Profile;
