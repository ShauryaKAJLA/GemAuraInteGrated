import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserDetails = () => {
    







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
  const printdot = () => {
    let str = '';
    for (let i = 1; i <= UserData?.passwordLength; i++) {
      str += '* ';
    }
    return str;
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center w-[100vw]'>
        <div className='border-b-2 border-b-[#662B2B] w-[90vw] text-xl my-2 pb-3 font-semibold text-[#662B2B]'>Personal Information</div>
        <div className='w-[100vw] flex flex-col justify-center items-center  font-semibold gap-3'>
            <div className='md:w-[50vw] sm:w-[60vw] w-[90vw] flex flex-col gap-2'><div className='text-sm text-[#662B2B]'>Username</div> <div className='border sm:max-w-[80%] md:max-w-[60%] max-w-[100%] rounded-md text-sm ml-10 p-2 shadow-md '>{UserData?.username}</div></div>
            <div className='md:w-[50vw] sm:w-[60vw] w-[90vw] flex flex-col gap-2'><div className='text-sm text-[#662B2B]'>Phone Number</div> <div className='border sm:max-w-[80%] md:max-w-[60%] max-w-[100%] rounded-md text-sm ml-10 p-2 shadow-md '>{UserData?.phoneNumber}</div></div>
            <div className='md:w-[50vw] sm:w-[60vw] w-[90vw] flex flex-col gap-2'><div className='text-sm text-[#662B2B]'>Email</div> <div className='border sm:max-w-[80%] md:max-w-[60%] max-w-[100%] rounded-md text-sm ml-10 p-2 shadow-md '>{UserData?.email}</div></div>
            <div className='md:w-[50vw] sm:w-[60vw] w-[90vw] flex flex-col gap-2'>
                <div>Address</div>
                <div className='h-[110px] sm:max-w-[80%] md:max-w-[60%] max-w-[100%] ml-10 p-2  overflow-y-scroll px-3'>
                {UserData?.address?.map((item,index)=><div key={index} className="my-3 flex justify-center items-center inp1  h-[80px] ">
                            <div className="h-[80px] w-[90%] overflow-y-scroll overflow-x-hidden">{item}</div>
                </div> )}
                </div>
            </div>
            <div className='md:w-[50vw] sm:w-[60vw] w-[90vw] flex flex-col gap-2'><div className='text-sm text-[#662B2B]'>Password</div> <div className='border sm:max-w-[80%] md:max-w-[60%] max-w-[100%] rounded-md text-sm ml-10 p-2 shadow-md '>{printdot()}</div></div>
        </div>
    </div>
  )
}

export default UserDetails



