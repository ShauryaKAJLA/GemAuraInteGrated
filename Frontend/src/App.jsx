import React, { useEffect } from "react"
import NavBar from './pages/Reusable/Navbar/NavBar'
import Footer from "./pages/Reusable/Footer/Footer"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import { addProducts } from "./products/FilteredProductsSlice"
function App() {
  const dispatch=useDispatch();

const handelCheckMenu=()=>{

  if(document.querySelector(".MainMenu").style.display=="flex")
  document.querySelector(".MainMenu").style.display="none"
}
  return (
    <div className='overflow-hidden app '>
      <NavBar />
      <div className="min-h-[92vh] h-[92.2vh]   overflow-x-hidden overflow-y-scroll relative flex flex-col justify-between" onMouseEnter={handelCheckMenu}>
      <Outlet />
      <Footer/>
      </div>
    </div>
  )
}

export default App
