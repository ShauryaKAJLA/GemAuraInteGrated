import React from "react";
import { Link } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import './Footer.css'
const Footer=()=>{
    const d = new Date();
    const year = d.getFullYear();
   return(
    <div className="min-h-[300px] colorCust w-[100vw]  bottom-[0] relative contFootMain">
        <div className="contFoot">
   
        <div className="GridCols" >
            <div className="text-xl customfooterColor font-semibold mb-2">Useful Links</div>
            <div className="contLink">
                <ul className="contLink">
                    <li className="linkData"><Link to="/">Return</Link></li>
                    <li className="linkData"><Link to="/contactUs">Find a Store</Link></li>
                </ul>
            </div>
        </div>
        <div className="GridCols" >
            <div className="text-xl customfooterColor font-semibold mb-2">Social Links</div>
            <div className="contLink">
                <ul className="contLink">
                    <li className="linkData"><Link to="/">Facebook</Link></li>
                    <li className="linkData"><Link to="/">Twitter</Link></li>
                    <li className="linkData"><Link to="/">Instagram</Link></li>
                </ul>
            </div>
        </div>
        <div className="GridCols" >
            <div className="text-xl customfooterColor font-semibold mb-2">Information</div>
            <div className="contLink">
                <ul className="contLink">
                    <li className="linkData"><Link to="/aboutUs">About Us</Link></li>
                </ul>
            </div>
        </div>
        <div className="GridCols" >
            <div className="text-xl customfooterColor font-semibold mb-2">Contact Us</div>
            <div className="contLink">
                <ul className="contLink">
                    <li className="linkData"><IoIosMail className="customfooterColor" size={20}/> <div>&nbsp; GemAura@gmail.com</div></li>
                    <li className="linkData"><FaPhoneAlt className="customfooterColor" size={14}/> <div>&nbsp;+91-9204824823</div></li>
                </ul>
            </div>
        </div>
        </div>
        <div className="copyright text-white sm:text-sm text-xs  font-extralight w-[100vw] h-[55px] justify-center flex flex-col items-center absolute bottom-0 ">
                 <div >@ {year} Gem Aura company limited. All right reserved.</div>
                 <div>Tearm & conditions  |  Privacy policy</div>
        </div>
    </div>
   )
}
export default Footer;