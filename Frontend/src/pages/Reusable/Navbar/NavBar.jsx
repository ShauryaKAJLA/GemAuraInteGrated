import React, { useEffect } from 'react'
import UMMER from '../../../assets/UMMER.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaCartShopping } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {changeGem, changeGender, changeMetal , changeSearch} from '../../../products/filterSlice'
import './NavBar.css'
const NavBar = () => {
  const navigate=useNavigate();
  const [quant,setQuant]=useState(0)
  const [check,setCheck]=useState(false);
  const [search,setSearch]=useState("");
  const dispatch=useDispatch();
 
  let cart=useSelector(state=>state.cart.cart)
  useEffect(()=>{

    let q=0
    cart.forEach(item=>{q+=item.quantity})
    q=parseInt(q)
    setQuant(q)
  },[cart])

  const handleChange=(e)=>{
      setSearch(e.target.value)
  }
  const GoSearch=()=>{
    if(search.trim()!="")
    {
     console.log("Bhai searched "+search)
         dispatch(changeSearch(search))
         navigate('/products/')
    }
  }
  return (
    <nav className=' contnav flex  top-[0px] justify-between w-screen px-3 h-14 sticky z-10'>
      
    <div className='logo flex justify-center items-center  gap-3 transition-all '>
      <FiMenu onMouseEnter={()=>document.querySelector(".MainMenu").style.display="flex"}   className='hover:scale-110 transition-all menu'size={25} />
      <Link to="/" className='hover:scale-105 transition-all'><img src={UMMER} alt="" className='w-[100px]' /></Link>
      </div>
    <div className='MainMenu'>
    <div className='aft' ><Link to="/Login_SignUp/" className='transition-all my-auto hover:scale-110 flex gap-2 text-1xl font-semibold justify-center'><FaRegUser  size={20}/>Profile</Link></div>
      <ul className='MainOpt flex gap-[5vw]'>
      <Link to="/"><li className='transition-all hover:scale-105 hover:underline'>Home</li></Link>
      <div className='products flex flex-col relative'><Link onClick={()=> { dispatch(changeGender("All")); dispatch(changeMetal("All")); dispatch(changeGem("All"));dispatch(changeSearch("All"));}  } to="/products/"><li className='transition-all hover:scale-105 hover:underline products w-auto'>Products</li></Link>
      <div className=' flex-col w-[100px] justify-center items-center -left-4 flex-wrap colorCust p-2 proOpt'>
      <Link  onClick={()=> { dispatch(changeGender("w")); dispatch(changeMetal("All")); dispatch(changeGem("All")); dispatch(changeSearch("All")) }} to="/products/"><li className='flex w-[100px] transition-all hover:scale-105 hover:underline' >Womens</li></Link>
      <Link  onClick={()=> { dispatch(changeGender("m")); dispatch(changeMetal("All")); dispatch(changeGem("All")); dispatch(changeSearch("All")) }}  to="/products/"><li className='flex w-[100px] transition-all hover:scale-105 hover:underline'>Mens</li></Link>
      <Link  onClick={()=> { dispatch(changeGender("k")); dispatch(changeMetal("All")); dispatch(changeGem("All")); dispatch(changeSearch("All")) }} to="/products/"><li className='flex w-[100px] transition-all hover:scale-105 hover:underline' >Kids</li></Link>
      </div>
      </div>
      <Link to="/ContactUs"><li className='transition-all hover:scale-105 hover:underline'>Contact Us</li></Link>
      <Link to="/AboutUs"><li className='transition-all hover:scale-105 hover:underline'>About Us</li></Link>
      </ul>
      </div>
      
    <div className='flex gap-2 justify-center items-center flex-wrap'>
      <div className='flex w-[20vw] hover:scale-105 search'><button className='border border-white rounded-s-full border-e-0 p-1' onClick={GoSearch}><FiSearch size={20} /></button><input className=' w-5/6 bg-inherit border border-white border-s-0 rounded-e-full outline-none  ' type="text" onKeyUp={(e)=>e.key=="Enter"&&GoSearch()}  value={search} onChange={(e)=>handleChange(e)}  /></div>
    <div className='pre hover:scale-110 transition-all' ><Link to="/Login_SignUp/" className='my-auto '><FaRegUser  size={20}/></ Link></div>
      <div className='relative'>
        <div className=' hover:scale-110 transition-all'><Link to="/cart/" className=''><FaCartShopping size={20} /></Link></div>
        {quant>0&&<div className='absolute -top-3 -right-2 bg-white rounded-full text-black text-[10px] font-bold w-3 h-[13px] flex  justify-center'>{quant}</div>}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
