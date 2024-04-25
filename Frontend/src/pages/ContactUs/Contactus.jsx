import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import './ContactUs.css'
import image from '../../assets/Contactus.jpg'
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { userCart } from '../cart/CartSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const Contactus = () => {
  const token = localStorage.getItem('token')
  const dispatch=useDispatch()
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
  
    const {
      register,
      handleSubmit,
      watch,
      reset,
      getValues,
      formState: { errors, isSubmitting },
    } = useForm()
    
    const [message, setMessage] = useState('');
    const onSubmit = async () => {
      const data = getValues()
      console.log({data})
      try {
        console.log('i am clicked')
        const response = await axios.post('http://localhost:5000/feedback/submit', {
          token,
          data : {name : data.name , email:data.Email , message : data.Message}
        });
        if(response.data.success){
          setMessage(response.data.message);
          reset()
        }
      } catch (error) {
        setMessage(error.response.data.message);
        console.error('Error:', error);
      }
    };
     
  return (
    <div>
        <div className='ContactImgContainer realtive'>
            <div className=' absolute top-5 right-[40vw] md:text-7xl sm:text-5xl text-4xl w-[100vw] flex items-center justify-center font-semibold text-white  dancing-script-Customtext'>Contact us</div>
            <img src={image} alt="" />

        </div>
        <div className='flex flex-wrap'>
      <div className="ContinerOfContent">
        <div className="gmap_canvas">
            <iframe className="gmap_iframe" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=goal market, mandi gobindgarh, punjab&amp;t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                </iframe>
                <a href="https://strandsgame.net/">Strands</a>
                </div>
              </div>
              <div className="ContinerOfContent flex flex-col justify-center items-center bg-zinc-100">
                <div className='text-3xl font-semibold text-custom  w-4/5'>Contact Info</div>
                <div className='w-4/5'>
                        <div className='flex items-center gap-[.5vw]' > <FaPhone className='text-custom'/> <div> +91 9000000910 </div> </div>
                        <div className='flex items-center gap-[.5vw]' > <IoIosMail className='text-custom'/>  <div> GemAura@gmail.com </div></div>
                        <div className='flex items-center gap-[.5vw]' > <CiLocationOn className='text-custom'/> <div className='w-[300px]'> Shop no 119 ,Gole Market, Mandi Gobindgarh, Punjab</div></div>

                </div>
              </div>
              <div className="ContinerOfContent flex flex-col justify-center items-center gap-y-[2vh] ">
                <div className='text-3xl font-semibold text-custom  w-full text-center'>Feedback / Message</div>
                <div >
              <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center gap-y-[2vh]'>
                <input className='inp w-[290px]' placeholder='Name' {...register("name",{required:{value:true,message:"This feild is required"}})} />
                {errors.name&& <div className=' text-xs text-red-600 w-[290px] text-right h-[5px]'>{errors.name.message}</div> }
                <input className='inp w-[290px]' placeholder='Gmail id' {...register("Email", {required:{value:true,message:"This feild is required"},pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:"Invalid Email"}})} />
                {errors.Email&& <div className=' text-xs text-red-600 w-[290px] text-right h-[5px]'>{errors.Email.message}</div> }
                <textarea className='inp w-[290px]' placeholder='Your Message' {...register("Message", {required:{value:true,message:"This feild is required"}})} />
                {errors.Message&& <div className=' text-xs text-red-600 w-[290px] text-right h-[5px]'>{errors.Message.message}</div> }
                <input className='inp w-[100px]' type="submit" disabled={isSubmitting} />
              </form>
              </div>
              </div>
              </div>
    </div>
  )
}

export default Contactus
