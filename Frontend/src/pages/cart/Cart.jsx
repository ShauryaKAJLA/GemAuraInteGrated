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
  const Navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const change = useSelector((state) => state.cart.cart);
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("accessToken");
  const [display, setDisplay] = useState(0);
  const [shipping, setShipping] = useState({
    name: "", pincode: null, address: "", phoneNumber: null, email: null
  });
  const [addressDisplay, setAD] = useState(1);
  const [address, setAddress] = useState("");
  const [user, setUser] = useState(null);

  const handlePlaceOrder = async () => {
    if (shipping.name.trim() == "") {
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
    if (!shipping.pincode) {
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
    if (!shipping.address || shipping.address?.trim() == "") {
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
    if (!shipping.phoneNumber) {
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
    if (!shipping.email || shipping.email.trim() == "") {
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
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/users/placeOrder`, {
        data: {
          ...shipping, totalPrice: price
        }
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      }, { withCredentials: true });
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
      setTimeout(() => {
        location.reload();
      }, [5000])
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
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/users/getAllCartItems`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        }, { withCredentials: true });
        dispatch(userCart(response.data.data));
        // console.log('this is csrt : ',{response})
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/users/getProfile`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      }, {
        withCredentials: true
      })
      console.log('user', response.data.userDetails)
      if (response.data.success === true) {
        setUser(response.data.userDetails)
      }
    } catch (err) {
      console.log("ERR : ", err)
    }
  }
  useEffect(() => {
    console.log(user)
    if (user)
      setShipping({ name: user?.username, phoneNumber: user?.phoneNumber, email: user?.email })
  }, [user])
  async function removeItemHandler(item) {
    // console.log(item)
    try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER}/users/deleteItem`, {
        data: { data: { itemId: item._id } },
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
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
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/users/reduceQuantity`, {
        data: { itemId: item._id },
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      }, { withCredentials: true });

      if (response.data.success === true) {
        dispatch(reduceQuantity(item));
      }
    } catch (err) {
      console.log("ERROR : ", err);
    }
  }

  async function addQuantityHandler(item) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/users/addQuantity`, {
        data: { itemId: item._id },
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      }, { withCredentials: true });
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
  const handleAddAddress = async () => {
    if (address.trim() != "") {
      try {
        await axios.post(`${import.meta.env.VITE_SERVER}/users/addAddress`, {
          data: { newAddress: address },
        }, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        }, { withCredentials: true }).then(() => {
          let add = user.address;
          add.push(address)
          setAddress("");
          setUser({ ...user, address: add })
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
        <div className="relative md:w-[75vw] w-[95vw] overflow-hidden rounded-[32px] border border-[#E8D8D2] bg-[#FFFDFC] shadow-[0_20px_80px_rgba(110,44,44,0.12)]">

          {/* Background Blur */}
          <div className="absolute -top-24 -left-24 h-60 w-60 rounded-full bg-[#6E2C2C]/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 h-60 w-60 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>

          <div className="relative p-8 md:p-12">

            {/* Heading */}
            <div className="text-center mb-10">

              <p className="uppercase tracking-[8px] text-[#6E2C2C] text-xs font-semibold">
                Premium Checkout
              </p>

              <h1 className="text-4xl font-black mt-3 bg-gradient-to-r from-[#6E2C2C] via-[#8B3A3A] to-[#D4AF37] bg-clip-text text-transparent">
                Shipping Details
              </h1>

              <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#6E2C2C] via-[#D4AF37] to-[#6E2C2C] mt-5"></div>

            </div>

            <div className="space-y-6">

              {/* Name */}
              <div>
                <label className="text-sm text-gray-500 font-medium mb-2 block">
                  Full Name
                </label>

                <input
                  type="text"
                  value={shipping.name}
                  placeholder="Enter your name"
                  onChange={(e) =>
                    setShipping({ ...shipping, name: e.target.value })
                  }
                  className="w-full rounded-2xl bg-[#FFFCFA] border border-[#E8D8D2] px-5 py-4 shadow-sm outline-none transition duration-300 focus:border-[#6E2C2C] focus:ring-4 focus:ring-[#6E2C2C]/10"
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="text-sm text-gray-500 font-medium mb-2 block">
                  Pincode
                </label>

                <input
                  type="text"
                  value={shipping.pincode}
                  placeholder="Enter pincode"
                  onChange={(e) =>
                    setShipping({ ...shipping, pincode: e.target.value })
                  }
                  className="w-full rounded-2xl bg-[#FFFCFA] border border-[#E8D8D2] px-5 py-4 shadow-sm outline-none transition duration-300 focus:border-[#6E2C2C] focus:ring-4 focus:ring-[#6E2C2C]/10"
                />
              </div>

              {/* Address */}
              {addressDisplay === 1 && user?.address?.length > 0 ? (
                <div>

                  <div className="flex justify-between items-center mb-5">

                    <h2 className="font-bold text-xl text-[#6E2C2C]">
                      Saved Addresses
                    </h2>

                    <button
                      onClick={() => setAD(2)}
                      className="rounded-full bg-gradient-to-r from-[#6E2C2C] to-[#8B3A3A] px-5 py-2 text-white font-semibold shadow-md hover:scale-105 transition"
                    >
                      + Add New
                    </button>

                  </div>

                  <div className="space-y-4 max-h-[260px] overflow-y-auto pr-2">

                    {user.address.map((item, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setShipping({ ...shipping, address: item })
                        }
                        className={`cursor-pointer rounded-2xl border p-5 transition duration-300 ${shipping.address === item
                            ? "border-[#6E2C2C] bg-[#FFF9F5] shadow-lg"
                            : "border-[#E8D8D2] bg-[#FFFCFA] hover:shadow-md hover:-translate-y-1"
                          }`}
                      >

                        <div className="flex gap-4">

                          <div className="text-2xl text-[#6E2C2C]">
                            {shipping.address === item ? (
                              <FaRegCheckCircle />
                            ) : (
                              <FaRegCircle />
                            )}
                          </div>

                          <div className="text-gray-700 leading-7">
                            {item}
                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-[#6E2C2C] p-6 bg-[#FFFCFA]">

                  <h2 className="font-bold text-[#6E2C2C] mb-4 text-lg">
                    Add New Address
                  </h2>

                  <textarea
                    value={address}
                    rows={5}
                    placeholder="Write your complete address..."
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-2xl border border-[#E8D8D2] bg-white px-4 py-4 outline-none resize-none focus:ring-4 focus:ring-[#6E2C2C]/10 focus:border-[#6E2C2C]"
                  />

                  <button
                    onClick={handleAddAddress}
                    className="mt-5 rounded-full bg-gradient-to-r from-[#6E2C2C] to-[#8B3A3A] px-8 py-3 font-semibold text-white shadow-md hover:scale-105 transition"
                  >
                    Save Address
                  </button>

                </div>
              )}

              {/* Contact */}
              <div className="grid md:grid-cols-2 gap-5">

                <div className="rounded-2xl bg-[#FFFCFA] border border-[#E8D8D2] shadow-sm p-5">
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Phone Number
                  </p>
                  <p className="mt-2 text-lg font-bold text-gray-700">
                    {shipping.phoneNumber}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FFFCFA] border border-[#E8D8D2] shadow-sm p-5">
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    Email Address
                  </p>
                  <p className="mt-2 text-lg font-bold text-gray-700 break-all">
                    {shipping.email}
                  </p>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-5 pt-5">

                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 rounded-full bg-gradient-to-r from-[#6E2C2C] via-[#8B3A3A] to-[#A56A2C] py-4 text-lg font-bold text-white shadow-[0_15px_35px_rgba(110,44,44,0.25)] hover:scale-[1.03] transition"
                >
                  Place Order
                </button>

                <button
                  onClick={() => setDisplay(0)}
                  className="flex-1 rounded-full border-2 border-[#6E2C2C] py-4 text-lg font-bold text-[#6E2C2C] hover:bg-[#6E2C2C] hover:text-white transition"
                >
                  Cancel
                </button>

              </div>

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
                        <button onClick={() => { setDisplay(1); getData() }}>Check Out</button>
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
