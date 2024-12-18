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
import Cookies from 'js-cookie'
import UserDetails from "./userDetails";
import Settings from "./Settings";
import Orders from "./Orders";
const Profile = () => {
  const token = Cookies.get("isLoggedIn")
  const [choose,setChoose]=useState(1);
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
 
  return (
     
    <div className="min-h-[100vh]  bg-white w-[100vw] flex flex-col items-center">
        <div className="md:text-3xl flex w-[100vw]   text-2xl text-[#662B2B] font-semibold p-5 ">Your Profile</div>
        <div className="w-[100vw] h-[30px] flex gap-1 sm:gap-5 md:gap-10 px-2 sm:px-5 md:px-15 sm:text-sm md:text-base text-xs">
          <div onClick={()=>setChoose(1)} className={`px-3 ${choose==1&&"border-b-[#662B2B] border-b-2 "}`}>Profile</div>
          <div onClick={()=>setChoose(2)} className={`px-3 ${choose==2&&"border-b-[#662B2B] border-b-2 "}`}>Orders</div>
          <div onClick={()=>setChoose(3)} className={`px-3 ${choose==3&&"border-b-[#662B2B] border-b-2 "}`}>Settings</div>
        </div>
        <div className="w-[100vw] border-2"></div>
        <div className="">
            {choose==1&& <UserDetails/> }
            {choose==2&& <Orders/> }
            {choose==3&& <Settings/> }
        </div>
    </div>
  );
};

export default Profile;
