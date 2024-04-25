import React, { useEffect, useState } from "react";
import imageData from "./imageData";
import "./Home.css";
import { GoDotFill } from "react-icons/go";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
// import catagories from "./CatagoriesData";
import img from "../../assets/homePage/second_img.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BannerFirstPhoto from "../../assets/homePage/BannerFirstPhoto.png";
import BannerSecondPhoto from "../../assets/homePage/BannerSecondPhoto.png";
// import { products } from "../../data/products";
import genderData from "./genderData";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProducts, changeProducts } from "../../products/FilteredProductsSlice";
import { userCart } from "../cart/CartSlice";
import { Link } from "react-router-dom";
import { changeGem, changeGender, changeMetal, changeSearch } from "../../products/filterSlice";
const Home = () => {
  const dispatch=useDispatch();
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsDataForCarousel, setproductsDataForCarousel] = useState([]);  // will get only 6 products for carousel

  // const [pdts, setpdts] = useState([]);

  // useEffect(() => {
  //   setpdts(products.filter((item, index) => index <= 6));
  // }, [products]);
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
                     addProducts(response.data.products)
                  }
              }catch(err){
                  console.log(err)
              }
          })()
      },[])
  const token = localStorage.getItem('token')
  // to get cart Length
  useEffect(()=>{
    (async()=>{
      try{
        const response = await axios.get('http://localhost:5000/home',{
          params:{
            token
          }
        
        })
        console.log('home : ',{response})
      }catch(err){
        console.log("ERROR : ",err)
      }
    })()
  },[])
  // setting categories data from api call
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategoriesData(response.data.categories);
      } catch (err) {
        console.log("ERROR : ", err);
      }
    })();
  }, []);
  
  // get only 6 from api

   // setting products data from api call
   useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/carousel");
        console.log({ response });
        setproductsDataForCarousel(response.data.products);
      } catch (error) {
        console.log("ERROR : ", error);
      }
    })();
  }, []);
  
  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "black",
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  }

  const [selectedImage, setSelectedImage] = useState(0);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1445,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 743,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  let timeout = setTimeout(() => {
    if (selectedImage <= 3) {
      setSelectedImage(selectedImage + 1);
    } else {
      setSelectedImage(0);
    }
  }, 5000);

  const HandleCrosalLeft = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    } else {
      setSelectedImage(4);
    }
    setTimeout(timeout);
  };

  const HandleCrosalRight = () => {
    if (selectedImage <= 3) {
      setSelectedImage(selectedImage + 1);
    } else {
      setSelectedImage(0);
    }
    setTimeout(timeout);
  };

  return (
    <div className="min-h-[100vh]">
      <div className="CrousalHomeMainContainer ">
        <FaChevronLeft
          className="absolute z-[3] left-2 top-1/2  text-white"
          size={30}
          onClick={() => {
            clearTimeout(timeout);
            HandleCrosalLeft();
          }}
        />
        <FaChevronRight
          className="absolute z-[3] right-2 top-[50%] text-white"
          size={30}
          onClick={() => {
            clearTimeout(timeout);
            HandleCrosalRight();
          }}
        />

        {imageData.map((item, index) => (
          <div
            key={index}
            className={
              selectedImage == index
                ? "CrousalHomeContainerImageDiv isSelected"
                : "isNotSelected"
            }
          >
            <div className="absolute w-full h-full top-0 z-[1] CrousalHomeContainerOverlay"></div>{" "}
            <img
              src={item.src}
              alt=""
              className={
                index == 2 || index == 4
                  ? "CrousalHomeContainerImage object-right"
                  : "CrousalHomeContainerImage object-center"
              }
            />
            <div className="CrousalHomeContainerTextDiv">
              <div className=" text-6xl text-white CrousalHomeContainerTextHead caveat-custom">
                {item.dataHead}
              </div>
              <div className="text-4xl text-white CrousalHomeContainerTextDesc">
                {item.dataDesc}
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 flex w-[100vw] justify-center z-[2]">
          {imageData.map((item, index) => (
            <GoDotFill
              key={index}
              className={
                selectedImage == index ? "text-rose-900" : "text-white "
              }
            />
          ))}
        </div>
      </div>
      <div className="ContainerImages2 ">
        <div className="ContainerImage4 relative">
        <Link to='/products'  onClick={()=> { dispatch(changeGender("All")); dispatch(changeMetal("Silver")); dispatch(changeGem("All")); dispatch(changeSearch("All")) }}>
          <div className="absolute dancing-script-Customtext  sm:text-3xl md:text-4xl lg:text-5xl text-3xl Image4Text">
            {" "}
            <div className=" inTextImage4 text-black p-[1vw]">
              {" "}
              <div> Silver Jewellery</div>{" "}
              <div className="w-full flex justify-center font-serif font-extralight sm:text-xl text-sm">
                Shop Now
              </div>
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/dimqqgecs/image/upload/v1711947279/xppscsjah7nrysq9vqmh.png"
            alt=""
          />
          </Link>
        </div>
          <Link to="/products" className="ContainerImage2">
          <img src={img} alt="" onClick={()=> { dispatch(changeGender("w")); dispatch(changeMetal("All")); dispatch(changeGem("All")); dispatch(changeSearch("All")) }} />
          <video
           onClick={()=> { dispatch(changeGender("m")); dispatch(changeMetal("All")); dispatch(changeGem("All")); dispatch(changeSearch("All")) }}
            src="https://res.cloudinary.com/dimqqgecs/video/upload/v1711984934/r3yisbaqkqdrs1b1grcl.mp4"
            autoPlay
            loop
            muted
            typeof="mp4"
            ></video>
            </Link>
      </div>
             {/* CATEGORIES */}
      <div className="CatagoriesContainer">
        <div className="CatagoriesContainerText">
          <div className="sm:text-4xl text-2xl font-semibold CatagoriesContainerMainHead">
            Shop by category
          </div>
          <div className="sm:text-xl text-xs CatagoriesContainerDesc">
            Browse through your favourite categories. We've got them all!
          </div>
        </div>
        
        {categoriesData  && categoriesData.length > 0 ? (
            <div className="CatagoriesContainerAllCat ">
              <Slider {...settings}>
                {categoriesData.map((item) => (
                  <Link to='products' onClick={()=> { dispatch(changeGender("All")); dispatch(changeMetal("All")); dispatch(changeGem("All")); dispatch(changeSearch(item.name)) }}>
                  <div key={item._id} className="CatagoriesCont">
                    <div className="ImageOfCatagories rounded-t-xl">
                      <img src={item.src} alt="" />
                    </div>
                    <div className="Catagoriesdata rounded-b-xl">
                      <div className="CustomCatagoryColor ">{item.name}</div>
                      <div className="text-white text-xs font-thin">
                        Explore &gt;
                      </div>
                    </div>
                  </div>
                  </Link>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              No category Found
            </div>
          )
        }
      </div>


      {/* Banner1 */}

      <div className="Banner1Div">
        <div className="Banner1InnerDiv">
          <div className="Banner1FirstPhoto">
            <img src={BannerFirstPhoto} alt="" />
          </div>
          <div className="Banner1Text">
            <div className="text-white sm:text-xl text-base">
              Silver-Dimonds Earrings
            </div>
            <div className="text-white sm:text-sm text-xs font-thin flex text-center">
              Indulge in the allure of our Silver Diamond Earrings, where
              classic beauty meets contemporary design. Crafted with precision
              and passion, each piece is a testament to our commitment to
              quality and style.
            </div>
            <div className="CustomCatagoryColor sm:text-sm text-xs underline">
              VIEW PRODUCTS
            </div>
          </div>
          <div className="Banner1SecondPhoto">
            <img src={BannerSecondPhoto} alt="" />
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      
        <div className="Products1">
       
        <div className="w-screen flex justify-end pr-[2vw] CustomCatagoryColor font-semibold">
          Check All Products &rarr;
        </div>
        { productsDataForCarousel && productsDataForCarousel.length>0 ?
        <div className="Products1Maindiv">
          <Slider {...settings}>
            {productsDataForCarousel.map((item) => (
              <div key={item._id} className="Products1productDiv">
                <div className="Products1ImageDiv rounded-t-2xl">
                  <img src={item.images[0]} alt="" />
                </div>
                <div className="Products1DataDiv rounded-b-2xl flex flex-col gap-[2vh]">
                  <div className="w-[100%] flex justify-center items-center md:text-sm text-xs">
                    {item.name}
                  </div>
                  <div className="flex justify-between px-1  md:px-2">
                    <div className=" text-xs font-thin md:text-sm">
                      {" "}
                      &#8377;{" "}
                      {item.metal.weightInGram * item.metal.pricePerGram +
                        item.Gem.totalPrice}
                    </div>
                    <div
                      className={
                        item.instock
                          ? "text-green-700 text-xs sm:text-sm"
                          : "text-red-700 text-xs md:text-sm"
                      }
                    >
                      {item.instock ? "in stock" : "Out of stock"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
          :
        <div className="flex justify-center items-center">No products found</div>
      }
      </div>

      {/* Gender */}

      <div className="mb-[10vh]">
        <div className="w-screem md:text-3xl sm:text-2xl text-xl CustomCatagoryColor flex justify-center items-center mb-10 ">
          Shop by Gender
        </div>
        <div className="flex flex-wrap w-screen justify-around gap-y-[4vh]">
          {genderData.map((item) => (
            <div key={item.id} className="sm:w-[30vw] w-[300px] border bg-black rounded-2xl overflow-hidden">
              <div className="sm:w-[30vw] 300px h-[80%]">
                <img
                  src={item.src}
                  className=" w-[100%] h-[100%] object-cover obj"
                  alt=""
                />
              </div>
              <div className="CustomCatagoryColor  text-xl justify-center flex items-center h-[20%]">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
