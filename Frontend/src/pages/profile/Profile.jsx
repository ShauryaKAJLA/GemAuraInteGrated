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

  const [UserData, setUserData] = useState({
    name: "Shaurya kajla",
    Male: "shauryakajla@gmail.com",
    Password: 5,
    address: "Bhai System Nagar ,dejfneaojfnf ;dnmf d;jfd lkfdlkf dlkfj aknfalk fal nfkla fllf aslkfklash fja fjfkjdeb fkjdbfkj adb, India",
    phone: 8847542649,
    CurrentOrders: [
      {
      id: 11,
      quantity: 3,
      price: 200000000,
      addressDelevery: "Bhai System Nagar , India",
      //  status : 0-pending 1-inProcess ;
      status: 1,
      products: [
        //details of products
        {
          id: "661c049fa3d128dce1a34c67",
          name: "Colambia emerald ring",
          desc: "rare emerald fitted in ring by experts",
          metal: {
            type: "White Gold",
            pricePerGram: 6500,
            weightInGram: 20,
          },
          Gem: {
            type: "emerald",
            weightInCaret: 3,
            totalPrice: 100000,
          },
          gender: "m",
          type_of: "ring",
          images: [
            '/src/assets/product1_1.png',
            "/src/assets/product1_2.webp",
            "/src/assets/product1_3.webp",
            "/src/assets/product1_4.webp"
          ],
          instock: true,
          size: 20,
          quantity: 3
        },
        {
          id: "661c049fa3d128dce1a34c67",
          name: "Colambia emerald ring",
          desc: "rare emerald fitted in ring by experts",
          metal: {
            type: "White Gold",
            pricePerGram: 6500,
            weightInGram: 20,
          },
          Gem: {
            type: "emerald",
            weightInCaret: 3,
            totalPrice: 100000,
          },
          gender: "m",
          type_of: "ring",
          images: [
            '/src/assets/product1_1.png',
            "/src/assets/product1_2.webp",
            "/src/assets/product1_3.webp",
            "/src/assets/product1_4.webp"
          ],
          instock: true,
          size: 20,
          quantity: 3
        },
        {
          id: "661c049fa3d128dce1a34c67",
          name: "Colambia emerald ring",
          desc: "rare emerald fitted in ring by experts",
          metal: {
            type: "White Gold",
            pricePerGram: 6500,
            weightInGram: 20,
          },
          Gem: {
            type: "emerald",
            weightInCaret: 3,
            totalPrice: 100000,
          },
          gender: "m",
          type_of: "ring",
          images: [
            '/src/assets/product1_1.png',
            "/src/assets/product1_2.webp",
            "/src/assets/product1_3.webp",
            "/src/assets/product1_4.webp"
          ],
          instock: true,
          size: 20,
          quantity: 3
        },
      ]
    },
      {
      id: 11,
      quantity: 3,
      price: 200000000,
      addressDelevery: "Bhai System Nagar , India",
      //  status : 0-pending 1-inProcess ;
      status: 1,
      products: [
        //details of products
        {
          id: "661c049fa3d128dce1a34c67",
          name: "Colambia emerald ring",
          desc: "rare emerald fitted in ring by experts",
          metal: {
            type: "White Gold",
            pricePerGram: 6500,
            weightInGram: 20,
          },
          Gem: {
            type: "emerald",
            weightInCaret: 3,
            totalPrice: 100000,
          },
          gender: "m",
          type_of: "ring",
          images: [
            '/src/assets/product1_1.png',
            "/src/assets/product1_2.webp",
            "/src/assets/product1_3.webp",
            "/src/assets/product1_4.webp"
          ],
          instock: true,
          size: 20,
          quantity: 3
        },
        {
          id: "661c049fa3d128dce1a34c67",
          name: "Colambia emerald ring",
          desc: "rare emerald fitted in ring by experts",
          metal: {
            type: "White Gold",
            pricePerGram: 6500,
            weightInGram: 20,
          },
          Gem: {
            type: "emerald",
            weightInCaret: 3,
            totalPrice: 100000,
          },
          gender: "m",
          type_of: "ring",
          images: [
            '/src/assets/product1_1.png',
            "/src/assets/product1_2.webp",
            "/src/assets/product1_3.webp",
            "/src/assets/product1_4.webp"
          ],
          instock: true,
          size: 20,
          quantity: 3
        },
        {
          id: "661c049fa3d128dce1a34c67",
          name: "Colambia emerald ring",
          desc: "rare emerald fitted in ring by experts",
          metal: {
            type: "White Gold",
            pricePerGram: 6500,
            weightInGram: 20,
          },
          Gem: {
            type: "emerald",
            weightInCaret: 3,
            totalPrice: 100000,
          },
          gender: "m",
          type_of: "ring",
          images: [
            '/src/assets/product1_1.png',
            "/src/assets/product1_2.webp",
            "/src/assets/product1_3.webp",
            "/src/assets/product1_4.webp"
          ],
          instock: true,
          size: 20,
          quantity: 3
        },
      ]
    }
  ],
    pastOrders: [
      {
        id: 15,
        quantity: 2,
        price: 2000000,
        addressDelevery: "Bhai System Nagar , India",
        //  status : 0-pending 1-inProcess -1 completed; 2 cancel
        status: -1,
        products: [
          //details of products
          {
            id: "661c049fa3d128dce1a34c67",
            name: "Colambia emerald ring",
            desc: "rare emerald fitted in ring by experts",
            metal: {
              type: "White Gold",
              pricePerGram: 6500,
              weightInGram: 20,
            },
            Gem: {
              type: "emerald",
              weightInCaret: 3,
              totalPrice: 100000,
            },
            gender: "m",
            type_of: "ring",
            images: [
              '/src/assets/product1_1.png',
              "/src/assets/product1_2.webp",
              "/src/assets/product1_3.webp",
              "/src/assets/product1_4.webp"
            ],
            instock: true,
            size: 25,
            quantity: 2
          }]
      }
    ]
  });

  const [display, setDisplay] = useState(1);
  const printdot = () => {
    let str = '';
    for (let i = 1; i <= UserData.Password; i++) {
      str += '* ';
    }
    return str;
  }

  const handleDeleteOrder=(ind,orderIndex)=>{
      
  }
  return (
     
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
        <div className="md:text-3xl text-slate-500 font-semiboldpx-2 ">Your Profile</div>
    <div className="h-[90vh] flex w-[100vw] justify-center items-center">
      <div className="flex flex-col  sm:text-base text-sm gap-y-5 min-h-[70vh] ">
        <div onClick={()=>setDisplay(1)} className={`${display==1&&"bg-[#d9eafc]"} min-h-[10vh] flex justify-center items-center sm:w-[30vw] w-[30vw] `}>Details</div>
        <div onClick={()=>setDisplay(0)} className={`${display==0&&"bg-[#d9eafc]"} min-h-[10vh] flex justify-center items-center sm:w-[30vw] w-[30vw] `}>Current Orders</div>
        <div onClick={()=>setDisplay(2)} className={`${display==2&&"bg-[#d9eafc]"} min-h-[10vh] flex justify-center items-center sm:w-[30vw] w-[30vw] `}>Order History</div>
      </div>
      <div>
        {display == 1 && <div className=" flex flex-col  sm:text-xl text-sm  gap-y-5 min-h-[70vh] ">
          <div  className="px-2 flex gap-2 bg-slate-200 min-h-[10vh] items-center rounded sm:w-[60vw] w-[70vw] justify-between">
           <div className="flex gap-4 h-[100%]  items-center"> <div><FaRegUser /> </div>
            <div>{UserData.name}</div>
            </div>
            

          </div>
          <div className="px-2 flex gap-2 bg-slate-200 min-h-[10vh] items-center justify-between rounded sm:w-[60vw] w-[70vw] ">
          <div className="flex gap-4 h-[100%]  items-center">  <div><FaPhoneAlt /> </div>
            <div>{UserData.phone}</div></div>
            

          </div>
          <div className="px-2 flex gap-2 bg-slate-200 min-h-[10vh] items-center rounded sm:w-[60vw] w-[70vw] ">
            <div className="h-[100%]  items-center"><IoIosMail /> </div>
            <div>{UserData.Male}</div>
            
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
        {display == 0 && <div className=" flex   sm:text-lg text-xs  gap-5 h-[70vh] overflow-y-auto overflow-x-hidden sm:w-[60vw] w-[70vw] flex-wrap justify-center">
          {UserData.CurrentOrders.map((item, index) => <div key={index} className="bg-slate-300 w-[300px] h-[50vh] rounded-md shadow-md  items-center flex flex-col text-gray-900 overflow-y-auto">
            <div className="flex w-[80%] gap-4">
             <div className="w-[70px]">id: </div> <div className="w-[150px]">{item.id}</div>
            </div>
            <div className="flex w-[80%] gap-4">
            <div className="w-[70px]">Quantity: </div>  <div className="w-[150px]">{item.quantity}</div>
            </div>
            <div className="flex w-[80%] gap-4">
             <div className="w-[70px]">Price: </div> <div className="w-[150px]"> {item.price}</div>
            </div>
            <div className="flex w-[80%] gap-4">
             <div  className="w-[70px]">Status: </div> <div className="w-[150px]">{item.status==0&&"Pending"}
                                      {item.status==1&&"In Progress"}</div>
            </div>
            <div className="flex w-[80%] gap-4">
             <div className="w-[70px] ">Address: </div> <div className="w-[150px]"> {item.addressDelevery}</div>
            </div>
            <div className="flex flex-col w-[80%] my-5">
              <div className="my-2">Ordered Products</div>
              <div className="flex flex-col gap-y-5">
              {item.products.map((i, ind) => <div key={ind}  >
                <Link to={`/productInfo/${i.id}`}>
                  <div className="flex  gap-4">
                    <div>Name: </div>
                    <div >{i.name}</div>

                  </div>
                  <div className="flex  gap-4">
                    <div>Product Quantity: </div>
                    <div >{i.quantity}</div>
                  </div>
                </Link>
              </div>)}
              </div>
            </div>
            
          </div>)}
        </div>}
        {display == 2 && <div className=" flex   sm:text-lg text-xs  gap-5 h-[70vh] overflow-y-auto overflow-x-hidden sm:w-[60vw] w-[70vw] flex-wrap justify-center">
          {UserData.pastOrders.map((item, index) => <div key={index} className="bg-slate-300 w-[300px] h-[40vh] rounded-md shadow-md  items-center flex flex-col text-gray-900 overflow-hidden">
            <div className="flex w-[80%] gap-4">
             <div className="w-[60px]">id: </div> <div>{item.id}</div>
            </div>
            <div className="flex w-[80%] gap-4">
            <div className="w-[60px]">Quantity: </div>  <div>{item.quantity}</div>
            </div>
            <div className="flex w-[80%] gap-4">
             <div className="w-[60px]">Price: </div> <div> {item.price}</div>
            </div>
            <div className="flex w-[80%] gap-4">
             <div  className="w-[60px]">Status: </div> <div>{item.status==0&&"Pending"}
                                      {item.status==1&&"In Progress"}
                                      {item.status==-1&&"Completed"}
                                      {item.status==2&&"Cancelled"}
                                      
                                      </div>
            </div>
            <div className="flex flex-col w-[80%] my-5">
              <div className="my-2">Ordered Products</div>
              <div className="flex flex-col gap-y-5">
              {item.products.map((i, ind) => <div key={ind}  >
                <Link to={`/productInfo/${i.id}`}>
                  <div className="flex  gap-4">
                    <div>Name: </div>
                    <div >{i.name}</div>

                  </div>
                  <div className="flex  gap-4">
                    <div>Product Quantity: </div>
                    <div >{i.quantity}</div>
                  </div>
                </Link>
              </div>)}
              </div>
            </div>
          </div>)}
        </div>}
             </div>
    </div>
    </div>
  );
};

export default Profile;
