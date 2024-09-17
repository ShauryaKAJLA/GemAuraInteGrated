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
const Profile = () => {
  const token = Cookies.get("isLoggedIn")
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
   
    </div>
  );
};

export default Profile;
