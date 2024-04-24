import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import sin from "../../assets/sin.jpg";
import logo from "../../assets/Backless_bg.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const [isShown, SetIsShown] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm();

  // api call
  const submitData = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        data: { email: data.Email, password: data.password },
      });

      if (response.data.success === true) {
        localStorage.setItem("token", response.data.user.token);
        navigate("/");
      }
    } catch (err) {
      console.log("ERROR : ", err.response.data.message);
    }
  };

  // ??
  const onSubmit = async (data) => {
    await submitData(data);
    // console.log(data);
    // setError("LoggedErr", { message: "Invalid details" });
    // navigate("/");
  };

  return (
    <div className="flex flex-row papa">
      <div className=" tra contlog flex flex-col justify-center">
        <div className="msg flex flex-col justify-center gap-y-[3vh] my-1">
          <div className="text-custom text-4xl font-semibold ">WELCOME</div>
          <div className=" lg:text-lg md:text-base text-sm flex justify-center flex-wrap text-center ww">
            Welcome back! please enter Email and password
          </div>
        </div>
        <div className="main flex flex-col justify-center ">
          <div className=" text-custom text-4xl p-[3vh]">Login</div>
          <div className="contfor ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form flex flex-col justify-center"
            >
              <input
                className="pp inp fo hover:scale-105 transition-all text-white"
                placeholder="Email"
                {...register("Email", {
                  required: { value: true, message: "This field is required" },
                  minLength: { value: 11, message: "Invalid Email name" },
                })}
              />
              <div className="flex justify-center  w-full text-red-300 text-xs ">
                {errors.Email && errors.Email.message}
              </div>
              <div className="relative">
                <input
                  type={isShown ? "text" : "password"}
                  className="pp inp fo hover:scale-105 transition-all text-white"
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
                />{" "}
                <div className="absolute top-[30%] right-3 hover:scale-110 text-white ">
                  {" "}
                  {isShown ? (
                    <FaEye onClick={() => SetIsShown(!isShown)} />
                  ) : (
                    <FaEyeSlash onClick={() => SetIsShown(!isShown)} />
                  )}
                </div>
              </div>
              <div className="flex justify-center  w-full text-red-300 text-xs ">
                {errors.password && errors.password.message}
              </div>
              <input
                type="submit"
                disabled={isSubmitting}
                className=" sb hover:scale-105 transition-all flex justify-center flex-wrap items-center inp"
              />
              <div className="flex justify-center w-full text-red-300 ">
                {errors.dataVerified && errors.password.message}
              </div>
            </form>
          </div>
        </div>
        <Link
          to="/Login_SignUp/"
          className="mt-3 text-custom hover:underline md:text-base text-sm "
        >
          Dont Have an account? / SignUp
        </Link>
      </div>
      <div className="contimg tra1">
        <img src={sin} className=" img z-[-1]" />
        <div className="absolute z-[1] bottom-0 left-0 w-[150px] LSlogo">
          <Link to="/">
            {" "}
            <img src={logo} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
