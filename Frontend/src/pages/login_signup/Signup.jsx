import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import sin from "../../assets/sin.jpg";
import logo from "../../assets/Backless_bg.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()
  const [isShown, SetIsShown] = useState(false);
  const [isShownMatch, SetIsShownMatch] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm();

  const submitData = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        data: { email: data.Email, password: data.password },
      });
      if(response.data.success === true)
        navigate('/login_signup/login')
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const onSubmit = async (data) => {
    console.log(data.password === data.enter);
    if (data.password === data.enter) {
      await submitData(data);
      console.log(data);
    } else {
      setError("match", { message: "Password doesnot match" });
    }
  };

  return (
    <div className="flex flex-row-reverse papa ">
      <div className=" tra1 contlog flex flex-col justify-center">
        <div className="msg flex flex-col justify-center gap-y-[3vh] my-1">
          <div className="text-custom text-4xl font-semibold ">WELCOME</div>
          <div className=" lg:text-lg md:text-base text-sm flex justify-center flex-wrap text-center ww">
            Create a new Account Enter Email and password
          </div>
        </div>
        <div className="main flex flex-col justify-center ">
          <div className=" text-custom text-4xl p-[3vh]">Sign Up</div>
          <div className="contfor ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form flex flex-col justify-center"
            >
              <input
                className="pp inp fo hover:scale-105 transition-all"
                placeholder="Email"
                {...register("Email", {
                  required: { value: true, message: "This field is required" },
                  minLength: { value: 11, message: "Invalid Email name" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid Email",
                  },
                })}
              />
              <div className="flex justify-center w-full text-red-300">
                {errors.Email && errors.Email.message}
              </div>
              <div className="relative">
                <input
                  type={isShown ? "text" : "password"}
                  className="pp inp fo hover:scale-105 transition-all"
                  placeholder="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: { value: 8, message: "Enter longer password" },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/,
                      message: "Generate a strong password",
                    },
                  })}
                />
                <div className="absolute top-[30%] right-3 hover:scale-110 text-white ">
                  {" "}
                  {isShown ? (
                    <FaEye onClick={() => SetIsShown(!isShown)} />
                  ) : (
                    <FaEyeSlash onClick={() => SetIsShown(!isShown)} />
                  )}
                </div>
              </div>
              <div className="flex justify-center w-full text-red-300">
                {errors.password && errors.password.message}
              </div>
              <div className="relative">
                <input
                  type={isShownMatch ? "text" : "password"}
                  className="pp inp fo hover:scale-105 transition-all"
                  placeholder="Re-enter password"
                  {...register("enter", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: { value: 8, message: "Enter longer password" },
                  })}
                />{" "}
                <div className="absolute top-[30%] right-3 hover:scale-110 text-white ">
                  {" "}
                  {isShownMatch ? (
                    <FaEye onClick={() => SetIsShownMatch(!isShownMatch)} />
                  ) : (
                    <FaEyeSlash
                      onClick={() => SetIsShownMatch(!isShownMatch)}
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-center w-full text-red-300">
                {errors.enter && errors.enter.message}
              </div>

              <div className="flex justify-center w-full text-red-300">
                {errors.match && errors.match.message}
              </div>
              <input
                type="submit"
                disabled={isSubmitting}
                className=" sb hover:scale-105 transition-all flex justify-center flex-wrap items-center inp"
                onClick={() => clearErrors("match")}
              />
              {/* <div className='flex justify-center w-full text-red-300'>{errors.dataVerified&&errors.dataVerified.message}</div>    */}
            </form>
          </div>
        </div>
        <Link
          to="/Login_SignUp/login"
          className="mt-3 text-custom hover:underline md:text-base text-sm"
        >
          Have an account? / login
        </Link>
      </div>
      <div className="contimg tra ">
        <img src={sin} className="img " />
        <div className="  absolute z-[1] bottom-0 right-0 w-[150px] LSlogo">
          <Link to="/">
            {" "}
            <img src={logo} alt="" />
          </Link>
        </div>
      </div>{" "}
    </div>
  );
};

export default Signup;
