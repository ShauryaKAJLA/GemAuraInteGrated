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
      try {
        const response = await axios.get("http://localhost:3000/users/getAllCartItems",{withCredentials:true});
        dispatch(userCart(response.data.data));
        // console.log('this is csrt : ',{response})
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
      const response = await axios.get('http://localhost:3000/users/getProfile',{
        withCredentials:true
      })
      console.log('user',{response})
      if(response.data.success === true)
        setUserData(response.data.userDetails)
      }catch(err){
        console.log("ERR : ",err)
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
            <div>{UserData.phoneNumber}</div></div>
            

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
      
                   </div>
    </div>
    </div>
  );
};

export default Profile;
