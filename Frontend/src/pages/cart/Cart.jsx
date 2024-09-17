import { useDispatch, useSelector } from "react-redux";
import { addQuantity, reduceQuantity, removeItem, userCart } from "./CartSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdError } from "react-icons/md";
import "./cart.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie'
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
export function Cart() {
  const Navigate=useNavigate();
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const change = useSelector((state) => state.cart.cart);
  const [cartItems, setCartItems] = useState([]);
  const token = Cookies.get("isLoggedIn");
  const [display, setDisplay] = useState(0);
  const [shipping,setShipping]=useState({
    name:"",pincode:null,address:"",phoneNumber:null,email:null
  });
  const [addressDisplay,setAD]=useState(1);
  const [address,setAddress]=useState("");
  const [user,setUser]=useState(null);

  const handlePlaceOrder=async ()=>{
    if(shipping.name.trim()=="")
    {
      toast.error("Name is required", {
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
      return null;
    }
    if(!shipping.pincode)
    {
      toast.error("Pincode is required", {
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
      return null;
    }
    if(!shipping.address||shipping.address?.trim()=="")
      {
        toast.error("Address is required", {
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
        return null;
      }
      if(!shipping.phoneNumber)
        {
          toast.error("Phone Number is required", {
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
          return null;
        }
        if(!shipping.email||shipping.email.trim()=="")
          {
            toast.error("Pincode is required", {
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
            return null;
          }
          try {
            const response=await axios.post("http://localhost:3000/users/placeOrder",{data:{
              ...shipping,totalPrice:price
            }},{withCredentials:true});
            console.log(response)
            toast.success(response.data.message, {
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
            setTimeout(()=>{
              location.reload();
            },[5000])
          } catch (error) {
            console.log(error)
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


  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/getAllCartItems",{withCredentials:true});
        dispatch(userCart(response.data.data));
        // console.log('this is csrt : ',{response})
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const getData=async ()=>{
    try{
      const response = await axios.get('http://localhost:3000/users/getProfile',{
        withCredentials:true
      })
      console.log('user',response.data.userDetails)
      if(response.data.success === true){
        setUser(response.data.userDetails)
      }
      }catch(err){
        console.log("ERR : ",err)
      }
  }
  useEffect(()=>{
    console.log(user)
    if(user)
    setShipping({name:user?.username,phoneNumber:user?.phoneNumber,email:user?.email})
  },[user])
  async function removeItemHandler(item) {
    // console.log(item)
    try {
      const response = await axios.delete("http://localhost:3000/users/deleteItem", {
        data: { data:{itemId: item._id} },
        withCredentials: true
      });
      if (response.data.success === true) {
        dispatch(removeItem(item));
      }
    } catch (err) {
      console.log("Error : ", err);
    }
  }

  async function reduceQuantityHandler(item) {
    try {
      const response = await axios.post("http://localhost:3000/users/reduceQuantity", {
        data:{itemId: item._id},
      },{withCredentials:true});

      if (response.data.success === true) {
        dispatch(reduceQuantity(item));
      }
    } catch (err) {
      console.log("ERROR : ", err);
    }
  }

  async function addQuantityHandler(item) {
    try {
      const response = await axios.post("http://localhost:3000/users/addQuantity", {
        data:{itemId: item._id},
      },{withCredentials:true});
      if (response.data.success === true) {
        console.log("Hello");
        dispatch(addQuantity(item));
      }
    } catch (err) {
      console.log(err);
    }
  }
  // console.log({cartItems})
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    let p = 0;
    change.forEach((item) => {
      if (item.product.inStock)
        p +=
          (item.product.Gem.totalPrice +
            item.product.metal.weightInGram * item.product.metal.pricePerGram) *
          item.quantity;
    });
    setPrice(p);
  }, [change]);
  useEffect(() => {
    setCartItems(change);
    console.log(change);
  }, [change]);
  const handleAddAddress=async ()=>{
    if(address.trim()!="")
    {
      try {
          await axios.post("http://localhost:3000/users/addAddress", {
          data:{newAddress: address},
           },{withCredentials:true}).then(()=>{
            let add=user.address;
            add.push(address)
            setAddress("");
             setUser({...user,address:add})
             setAD(1)
           })

      } catch (error) {
        console.log(error)
      }

    }
  }
  return (
    <div className=" flex flex-col justify-center items-center py-8 min-h-[49vh] relative">
      {display ? (
        <div className="md:w-[70vw] w-[90vw]  gap-12 p-2 shadow-[#662b2b62] rounded-lg min-h-[80vh] flex flex-col  items-center  ">
            <div className="text-2xl font-bold text-[#DD6A6A]">Shipping Details</div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div><input type="text" placeholder="Name" value={shipping.name} onChange={(e)=>setShipping({...shipping,name:e.target.value})} className="inp1 w-[60vw] md:w-[40vw] lg:w-[30vw]"/></div>
              <div><input type="text" placeholder="Pincode" value={shipping.pincode} onChange={(e)=>setShipping({...shipping,pincode:e.target.value})} className="inp1 w-[60vw] md:w-[40vw] lg:w-[30vw]"/></div>
              <div className="flex w-[60vw] md:w-[40vw] lg:w-[30vw]">
                {addressDisplay==1&&user?.address?.length!=0?<div className="flex flex-col  w-[60vw] md:w-[40vw] lg:w-[30vw]">
                  <div className="font-bold p-2 text-[#DD6A6A]">Select Address</div>
                  <div className="h-[200px] overflow-x-auto ">
                        {user?.address?.map((item,index)=><div key={index} className="my-3 flex justify-center items-center inp1  h-[80px] ">
                          <div className="p-2 font-extrabold  text-xl">{shipping.address==item?<FaRegCheckCircle />:<FaRegCircle onClick={()=>{setShipping({...shipping,address:item})}}/>}</div>
                            <div className="h-[80px] w-[90%] overflow-y-scroll overflow-x-hidden">{item}</div>
                        </div> )}
                  </div>
                        <button onClick={()=>setAD(2)} className="font-bold border-[#DD6A6A] shadow-lg border bg-white text-xs p-1 text-center justify-center rounded-md  w-[70px] text-[#DD6A6A] flex items-center">Add New</button>
                </div>:
                 <div>
                 <div>Add Address</div>
                    <textarea name="Address" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} className="inp1 w-[60vw] md:w-[40vw] lg:w-[30vw]"></textarea>
                    <div onClick={handleAddAddress}>Add</div>
               </div>
                }
              </div>
              <div className="inp1 w-[60vw] md:w-[40vw] lg:w-[30vw]">{shipping?.phoneNumber}</div>
              <div className="inp1 w-[60vw] md:w-[40vw] lg:w-[30vw]">{shipping?.email}</div>
              <div className="flex gap-4 p-5">
                <button className="inp1 md:w-[13vw] text-sm " onClick={handlePlaceOrder}>Place Order</button>
                <button className="inp1 md:w-[13vw] text-sm " onClick={()=>setDisplay(0)}>Cancel Order</button>
              </div>
            </div>
        </div>
      ) : (
        <>

      <div className=" lg:h-[15vh] md:h-[9vh]  w-[100vw] h-[10vh] text-2xl flex justify-center items-center">
        Your cart items
      </div>
      <div className="lg:h-[6vh] md:h-[6vh]  w-[100vw] h-[8vh]  flex justify-center items-center text-custom underline font-semibold text-sm">
        <Link to="/">Back to Home</Link>
      </div>
      {cartItems ? (
        cartItems.length ? (
          <div className="lg:w-[70vw] md:w-[80vw]  sm:w-[95vw] w-[99vw] border-t  mt-[5vh]">
            {cartItems.map((item) => (
              <div
                // key={item.product.hasOwnProperty("size") ? item.product.secId : item.product.id}
                key={item._id}
                className="flex justify-between border-b my-[5vh] py-[2vh] "
              >
                <div className="flex gap-x-[2vw] h-[90px] ">
                  <Link to={`/productInfo/${item.product && item.product._id}`}>
                    <div className="w-[90px] h-[90px] overflow-hidden flex flex-col justify-center items-center rounded-[15%] bg-black">
                      <img
                        src={item.product && item.product.images[0]}
                        className="w-[100%] h-[100%] shrink-0 object-cover object-center  "
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col sm:w-auto w-[40vw]  h-[90px] justify-center gap-[3vh]">
                    <Link
                      to={`/productInfo/${item.product && item.product._id}`}
                    >
                      <div className="font-semibold lg:text-lg sm:text-lg text-sm">
                        {item.product && item.product.name}{" "}
                        {item.product && item.size
                          ? `(Size : ${item.size})`
                          : null}
                      </div>
                    </Link>
                    <div className=" sm:text-sm text-xs text-custom font-semibold ">
                      <button
                        // onClick={() => dispatch(removeItem(item))}
                        onClick={(e) => removeItemHandler(item)}
                        className="hover:underline"
                      >
                        <MdDelete size={25} />
                      </button>
                      {item.product && !item.product.inStock && (
                        <div className=" text-red-600 flex  items-center ">
                          <MdError />
                          &nbsp; Out of stock
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col font-medium lg:text-base md:text-base sm:text-base text-xs gap-y-[1vh]">
                  <div className="flex">
                    <div className="w-[10vw] head">Price: </div>{" "}
                    <div>
                      {" "}
                      {item.product &&
                        item.product.Gem.totalPrice +
                          item.product.metal.pricePerGram *
                            item.product.metal.weightInGram}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[10vw] head">Quantity:</div>
                    <div className="w-[55px] justify-between flex px-1 text-base h-[25px] items-center customIncrement ">
                      <button
                        // onClick={() => dispatch(reduceQuantity(item.product))}
                        onClick={(e) => reduceQuantityHandler(item)}
                        className="flex justify-center items-center sm:text-xl text-lg"
                      >
                        -
                      </button>
                      <div className="flex justify-center items-center">
                        {item.product && item.quantity}
                      </div>
                      <button
                        // onClick={() => dispatch(addQuantity(item.product))}
                        onClick={(e) => addQuantityHandler(item)}
                        className="flex justify-center items-center sm:text-xl text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[10vw] head">Total: </div>
                    <div>
                      {(item.product.Gem.totalPrice +
                        item.product.metal.pricePerGram *
                          item.product.metal.weightInGram) *
                        item.quantity}
                    </div>
                  </div>

                  {item.product.hasOwnProperty("size") && (
                    <div className="flex">
                      <div className="w-[10vw] head">Size: </div>
                      <div className=" sm:w-[55px] w-[50px] sm:h-[30px] h-[20px] flex justify-center items-center sm:text-base text-xs">
                        {item.product.size}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-end sm:text-lg text-base font-semibold">
              {/*  price component */}
              {cartItems.length !== 0 && (
                <div className="flex gap-[5vw] items-center">
                  <div>Sub-Total &nbsp; Rs-{price}</div>
                  <div className="inp btn flex justify-center text-sm sm:w-[150px] sm:h-[45px] hover:scale-105">
                    <button onClick={() =>{ setDisplay(1); getData()}}>Check Out</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>Your Cart is empty</div>
        )
      ) : (
        <div>Loading ...</div>
      )}
      </>
      )}
    </div>
    
  );
  
}
