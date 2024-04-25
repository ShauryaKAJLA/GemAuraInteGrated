import { changeGender, changePrice ,changeMetal, changeGem } from "./filterSlice";
import { changeProducts } from "./FilteredProductsSlice";
import { addToCart, userCart } from "../pages/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Product.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { all } from 'axios'
import { addProducts } from "./FilteredProductsSlice";
export function Product() {
  const change =useSelector((state) => state.FilteredProducts.products)
  const [productsData,setProductsData] =useState( null);
  // state.products = respons
  const dispatch = useDispatch();
  const[mx,setMx]=useState(0);
  const[mn,setMn]=useState(0);

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

  useEffect(()=>{
    (async()=>{
      try{
        const response = await axios.get('http://localhost:5000/products')
        if(response.data.success===true)
        {
          console.log("HELLO")
          dispatch(addProducts(response.data.products))
          setProductsData(response.data.products)
          let l=0
          response.data.products.forEach(item=>{
              if(l<item.metal.pricePerGram*item.metal.weightInGram+item.Gem.totalPrice)
              {
                  l=item.metal.pricePerGram*item.metal.weightInGram+item.Gem.totalPrice;
              }
              if(!findmetallist.find(i=>i.toLowerCase()==item.metal.type.toLowerCase()))
              {
                  findmetallist.push(item.metal.type)
              }
              if(!findgemlist.find(i=>i==item.Gem.type))
              {
                  findgemlist.push(item.Gem.type)
              }
          })
          setMx(l)
          setValue(l);
          response.data.products.forEach(item=>{
            if(l>item.metal.pricePerGram*item.metal.weightInGram+item.Gem.totalPrice)
            {
                l=item.metal.pricePerGram*item.metal.weightInGram+item.Gem.totalPrice;
            }
        })
        setMn(l)
        }

      }catch(err){
        console.log(err)
      }
    })()
  },[])
  const filter=useSelector(state=>state.filter.filter)
  let findmetallist=["All"];
    let findgemlist=["All"]
   
    const [value,setValue]=useState(mx)
    const [gender,setGender]=useState(filter.gender)
    console.log(gender)
    const [metal,setMetal]=useState(filter.Metal);
    const [metalList,setMetalList]=useState(findmetallist)
    const [Gem,setGem]=useState(filter.Gem);
    const [Gemlist,setGemList]=useState(findgemlist);
    const  handelPricechange=(e)=>{
        setValue(e.target.value)
    }
    const handelGenderChange=(e)=>{
        setGender(e.target.value)
    }
    const handelMetalChange=(e)=>{
        setMetal(e.target.value)
    }
    const handelGemChange=(e)=>{
        setGem(e.target.value)
    }
    useEffect(()=>{
        dispatch(changePrice(value))
    },[value])
    useEffect(()=>{
        dispatch(changeGender(gender))
    },[gender])
    useEffect(()=>{
        dispatch(changeMetal(metal))
    },[metal])
    useEffect(()=>{
        dispatch(changeGem(Gem));
    },[Gem])
    useEffect(()=>{
        dispatch(changeProducts(filter))
        console.log(filter)
    },[filter])



  const size = 10;
 
  
  useEffect(()=>{
      setProductsData(change)
  },[change])
  // const cart = useSelector((state) => state.cart);
  const token = localStorage.getItem('token')
   async  function handleAddToCart(product){
    try{
      console.log({product})
      const response = await axios.post('http://localhost:5000/cart/add',{
        productId : product._id,
        token ,
        size : product.type_of==='ring'||product.type_of==='Ring' ? size : undefined ,
      })
      if(response.data.success === true){
          // dispatch(addToCart(product))
          let result=response.data.cart
          if(product.type_of==='ring'||product.type_of==='Ring')
          {
            let newProduct=result.find(item=>(item.product._id==product._id&&item.size==size));
            console.log(newProduct)
            dispatch(addToCart(newProduct))
          }
          else{
          let newProduct=result.find(item=>item.product._id==product._id);
          console.log(newProduct)
          dispatch(addToCart(newProduct))
          }
      }
    }catch(err){
      
      console.log(err )
    }    
  } 


 //  add to cart 
 {/*
 
*/}

  return (
    <div className="flex flex-col  overflow-x-hidden">
      <div className="filter">
      <div className="flex flex-col w-[100vw]">
     <div className="Filter w-[100vw] text-2xl font-medium justify-center flex my-3">Filters</div>
     <div className="flex justify-around">
     <div className="text-custom flex gap-[1vw]  sm:text-lg text-sm">Price: <div className="flex flex-col sm:text-base text-xs">  <input type="range" max={mx} min={mn} value={value} onChange={(e)=>handelPricechange(e)} className="sm:w-[10vw] w-[70px]  h-1 my-1 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-600"/> <div className="flex justify-center range sm:text-base text-xs"> &#x20B9; {value}</div></div></div>
    <div className="text-custom  sm:text-lg text-sm gap-[1vw] flex" >Gender: <div><select     value={gender} onChange={(e)=>handelGenderChange(e)} className="text-black md:w-[80px]  sm:w-[50px] w-[37px] sm:text-base text-sm">
        <option value="All" >All</option>
        <option value="m">Men</option>
        <option value="w">Women</option>
        <option value="k">Kids</option>
    </select></div></div>
    <div className="text-custom  sm:text-lg text-sm gap-[1vw] flex">Metal: <div> <select value={metal} onChange={(e)=>handelMetalChange(e)} className="text-black md:w-[80px]  sm:w-[50px] w-[37px] sm:text-base text-sm">
        {metalList.map(i=> <option value={i} key={i}>{i}</option>)}
    </select> 
    </div>
    </div>  
    <div className="text-custom  sm:text-lg text-sm flex gap-[1vw] ">

    Gem:
    <div><select value={Gem} onChange={(e)=>handelGemChange(e)} className="text-black md:w-[80px]  sm:w-[50px] w-[37px] sm:text-base text-sm">
        {Gemlist.map(i=> <option value={i} key={i}>{i}</option>)}
    </select>
    </div>
    </div>
    </div>
    </div>
      </div>
      <div className="pros">
        <div className="my-4 text-2xl w-[100vw] flex justify-center  h-7 font-semibold ">
          All Products
        </div>
        <div className="flex h-auto w-[100vw] flex-wrap overflow-y-scroll proCont pb-4 ">
          {productsData ? (productsData.length>0 ? (
            productsData.map((item) => (
              <div
                key={item._id}
                className=" m-2 gap-y-1 w-[200px] h-[310px] flex flex-col proDiv justify-center">
                  
                <Link to={`/productInfo/${item._id}`}>
                  <div className=" bg-black w-[200px] h-[250px] rounded-[15px] flex justify-center flex-wrap items-center proUp">
                    <img
                      src={item.images[0]}
                      className="  w-[200px] h-[200px]  rounded-[15px]  object-contain object-center proImg"
                    />
                    <div className="text-white w-[200px] overflow-clip justify-center flex proName proNamePre">
                      {item.name}
                    </div>
                  </div>
                </Link>
                <div>
                  <Link to={`/productInfo/${item.id}`}>
                    {" "}
                    <div className="hidden proNameAft font-bold text-sm ">
                      {item.name}
                    </div>{" "}
                  </Link>
                  <Link to={`/productInfo/${item.id}`}>
                    <div className="flex justify-between w-[200px] h-[25px] proMiddle">
                      <div className="font-semibold proPrice">
                        Rs.
                        {item.Gem.totalPrice +
                          item.metal.pricePerGram * item.metal.weightInGram}
                      </div>
                      <div className="text-xs font-semibold proStock">
                        <div
                          className={
                            item.instock ? "text-green-800" : "text-red-800"
                          }
                        >
                          {item.instock ? "In stock" : "out of stock"}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex w-[200px] justify-between flex-wrap items-center proDown">
                    <div
                      className="text-white  bg-black w-[165px] h-[30px] rounded-[4px] flex justify-center text-sm proCart"
                      // onClick={() => dispatch(addToCart(item))}
                      onClick={(e) => handleAddToCart(item)}
                    >
                      <button>+ Add To Cart</button>
                    </div>
                    <div className=" custom-bg w-[30px] h-[30px] rounded-[4px] flex justify-center flex-wrap items-center proWish">
                      <FaRegHeart />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className=" text-4xl text-red-600 justify-center flex w-full">
              "No Products Found"
            </div>
          ))
          :
          <div className=" text-4xl text-red-600 justify-center flex w-full">
              Loading ...
            </div>
        }
        </div>
      </div>
    </div>
  );
}

