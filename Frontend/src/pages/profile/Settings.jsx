import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { MdDelete } from "react-icons/md";

const Settings = () => {
  



  // to get user basic details
  const [UserData , setUserData] = useState(null)
  const [inputUs,setInputUs]=useState(0);
  const [username,setUsername]=useState("");
  const [inputPh,setInputPh]=useState(0);
  const [phone,setPhone]=useState("");
  const [inputEm,setInputEm]=useState(0);
  const [email,setEmail]=useState("");
  const [inputPa,setInputPa]=useState(0);
  const [password,setPassword]=useState("");
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

  const [addressDisplay,setAD]=useState(1);
  const [address,setAddress]=useState("");

  const handleAddAddress=async ()=>{
    if(address.trim()!="")
    {
      try {
          await axios.post("http://localhost:3000/users/addAddress", {
          data:{newAddress: address},
           },{withCredentials:true}).then(()=>{
            let add=UserData.address;
            add.push(address)
            setAddress("");
             setUserData({...UserData,address:add})
            setAD(1)
           })

      } catch (error) {
        console.log(error.response.data.message)
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
      }

    }
  }
  const handleChangeUsername=async ()=>{
    try {
      
      const response=await axios.post("http://localhost:3000/users/changeUsername",{data:{username}},{withCredentials:true})
      setUserData({...UserData,username})
      setUsername("");
      setInputUs(0);
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
    }
  }
  const handleChangePhoneNumber=async ()=>{
    try {
      
      const response=await axios.post("http://localhost:3000/users/changePhoneNumber",{data:{phone}},{withCredentials:true})
      setUserData({...UserData,phoneNumber:phone})
      setPhone("");
      setInputPh(0);
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
    }
  }

  const handleChangeEmail=async ()=>{
    try 
    {
      const response=await axios.post("http://localhost:3000/users/changeEmail",{data:{email}},{withCredentials:true})
      setUserData({...UserData,email})
      setEmail("");
      setInputEm(0);
    } 
    catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
    }
  }
  const handleChangePassword=async ()=>{
    try {
      
      const response=await axios.post("http://localhost:3000/users/changePassword",{data:{password}},{withCredentials:true})
      setUserData({...UserData,passwordLength:password.length})
      setPassword("");
      setInputPa(0);
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
    }
  }

  const handleDeleteAddress=async (index)=>{
    try {
      
      const response=await axios.post("http://localhost:3000/users/deleteAddress",{data:{index}},{withCredentials:true})
      const address=UserData.address.filter((_,i)=>i!=index)
      setUserData({...UserData,address})
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
    }
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center w-[100vw] '>
        <div  className='flex  text-xl font-semibold md:w-[50vw] sm:w-[60vw] w-[90vw] '>Personal Information</div>
        <div className='w-[100vw] flex flex-col justify-center items-center  font-semibold gap-4 my-3'>
           {inputUs==0? <div className='md:w-[50vw] sm:w-[60vw] w-[90vw] flex flex-col gap-2'><div className='text-sm text-[#662B2B]'>Username</div> <div className='border sm:max-w-[80%] md:max-w-[60%] max-w-[100%] rounded-md text-sm ml-10 p-2 shadow-md '>{UserData?.username}</div><button className='bg-[#662B2B] p-1 w-[50px] font-bold flex justify-center items-center rounded-md text-xs text-white'  onClick={()=>setInputUs(1)}>Edit</button></div> : 
            <div>
            <div>Enter New Username</div>
               <input name="username" type='text' placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} className="inp1 w-[60vw] md:w-[40vw] lg:w-[30vw"></input>
               <div onClick={handleChangeUsername} className='bg-[#662B2B] my-2 p-1 min-w-[55px] max-w-[100px] font-bold flex justify-center items-center rounded-md text-xs text-white' >Save</div>
          </div>
           }
            
            {inputPh==0?<div className='md:w-[50vw] sm:w-[60vw] w-[90vw] flex flex-col gap-2'><div className='text-sm text-[#662B2B]'>Phone Number</div> <div className='border sm:max-w-[80%] md:max-w-[60%] max-w-[100%] rounded-md text-sm ml-10 p-2 shadow-md '>{UserData?.phoneNumber}</div><button className='bg-[#662B2B] p-1 w-[50px] font-bold flex justify-center items-center rounded-md text-xs text-white' onClick={()=>setInputPh(1)}>Edit</button></div>
            :
            <div>
            <div>Enter New PhoneNumber</div>
            <input name="phonenumber" type='text' placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} className="inp1 w-[60vw] md:w-[40vw] lg:w-[30vw"></input>
            <div onClick={handleChangePhoneNumber} className='bg-[#662B2B] my-2 p-1 min-w-[55px] max-w-[100px] font-bold flex justify-center items-center rounded-md text-xs text-white' >Save</div>
            </div>
          }
           {inputEm==0? <div className='md:w-[50vw] sm:w-[60vw] w-[90vw] flex flex-col gap-2'><div className='text-sm text-[#662B2B]'>Email</div> <div className='border sm:max-w-[80%] md:max-w-[60%] max-w-[100%] rounded-md text-sm ml-10 p-2 shadow-md '>{UserData?.email}</div><button className='bg-[#662B2B] p-1 w-[50px] font-bold flex justify-center items-center rounded-md text-xs text-white' onClick={()=>setInputEm(1)}>Edit</button></div>
            :
            <div>
            <div>Enter New Email</div>
            <input name="Email" type='text' placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="inp1 w-[60vw] md:w-[40vw] lg:w-[30vw"></input>
            <div onClick={handleChangeEmail} className='bg-[#662B2B] my-2 p-1 min-w-[55px] max-w-[100px] font-bold flex justify-center items-center rounded-md text-xs text-white' >Save</div>
            </div>
          }
            <div className='md:w-[50vw] sm:w-[60vw] w-[90vw] flex flex-col gap-2'>
                {addressDisplay==1&&UserData?.address?.length!=0?<div className="flex flex-col  w-[60vw] md:w-[40vw] lg:w-[30vw]">
                  <div className='text-sm text-[#662B2B]'>Address</div>
                  <div className="h-[200px] overflow-x-auto ">
                      {UserData?.address?.map((item,index)=><div key={index} className="my-3 flex justify-center items-center inp1  h-[80px] ">
                                <div className="h-[80px] w-[90%] overflow-y-scroll overflow-x-hidden">{item}</div>
                                <div onClick={()=>handleDeleteAddress(index)} className='sm:text-xl md:text-2xl'><MdDelete /></div>
                    </div> )}
                  </div>
                        <button onClick={()=>setAD(2)} className='bg-[#662B2B] my-2 p-1 min-w-[55px] max-w-[100px] font-bold flex justify-center items-center rounded-md text-xs text-white' >Add New</button>
                </div>:
                 <div>
                 <div>Add Address</div>
                    <textarea name="Address" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} className="inp1 w-[60vw] md:w-[40vw] lg:w-[30vw]"></textarea>
                    <div onClick={handleAddAddress} className='bg-[#662B2B] my-2 p-1 min-w-[55px] max-w-[100px] font-bold flex justify-center items-center rounded-md text-xs text-white' >Add</div>
               </div>
                }
              </div>
            
            {inputPa==0?<div className='md:w-[50vw] sm:w-[60vw] w-[90vw] flex flex-col gap-2'><div className='text-sm text-[#662B2B]'>Password</div> <div className='border sm:max-w-[80%] md:max-w-[60%] max-w-[100%] rounded-md text-sm ml-10 p-2 shadow-md '>{printdot()}</div><button className='bg-[#662B2B] p-1 w-[50px] font-bold flex justify-center items-center rounded-md text-xs text-white' onClick={()=>setInputPa(1)}>Edit</button></div>
            :
            <div>
            <div>Enter New Password</div>
            <input name="password" type='text' placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="inp1 w-[60vw] md:w-[40vw] lg:w-[30vw"></input>
            <div onClick={handleChangePassword} className='bg-[#662B2B] my-2 p-1 min-w-[55px] max-w-[100px] font-bold flex justify-center items-center rounded-md text-xs text-white' >Save</div>
            </div>
            }
        </div>
    </div>
  )
}

export default Settings
