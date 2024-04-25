import React, { useEffect } from 'react'
import AboutUs from '../../assets/AboutUs.jpg'
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import './AboutUs.css'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { userCart } from '../cart/CartSlice';
const About_us=()=>{
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
  return(
    <div className='h-[100vh] ContAbout '>
        <div className='Back text-white absolute top-3 left-4 z-[1]'> <Link to="/"><RxCross1 size={20}/></Link></div>
        <div className='AboutUsImgCont'>
            <video src="https://media.istockphoto.com/id/1429305667/video/bride-red-neckless.mp4?s=mp4-640x640-is&k=20&c=ReLvVPLr0LnuPwo7z7CbXG9CgxNlvuzIpOz3qRkIwEE=" autoPlay loop className='AboutUsImg'/>
        </div>
        <div className='ContText'>
        <div className='Head dancing-script-Customtext'>About Gem Aura</div>
        <div className=' text'>
Welcome to Gem Aura, a legacy in the world of jewelry since 1940. What began as a local jewelry store has now evolved into a digital platform, bringing our exquisite collection of genuine and real jewelry to customers worldwide.

For over eight decades, Gem Aura has been synonymous with quality, craftsmanship, and trust. Our journey from a brick-and-mortar store to an online platform is driven by our commitment to make the jewelry shopping experience convenient and enjoyable for you.

At Gem Aura, we understand that every piece of jewelry tells a unique story. That's why we take pride in curating a diverse collection that caters to every style and occasion. From timeless classics to contemporary designs, each piece is crafted with precision and care, ensuring that you receive nothing but the best.

As we embrace the digital age, our core values remain unchanged. We are dedicated to providing you with exceptional customer service, unparalleled craftsmanship, and, most importantly, jewelry that you will cherish for a lifetime.

Thank you for choosing Gem Aura. We look forward to being a part of your special moments and helping you find the perfect piece that reflects your unique style.
</div>
</div>
</div>
  )
}
export default About_us