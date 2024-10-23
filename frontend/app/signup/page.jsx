"use client";
import { Logo } from "@/components/icons/Icons";
import Link from "next/link";
import { useState, useRef } from "react";
const HomePage = () => {
  const BACKEND_ENDPOINT = "http://localhost:8888/sign-up";
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setReShowPassword] = useState(false);

  const createPwRef = useRef(null);
  const confirmPwRef = useRef(null);
  const alertTextRef = useRef(null);
  const alertIconRef = useRef(null);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (createPwRef.current.value === confirmPwRef.current.value) {
      // alertTextRef.current.innerText = "Password matched";
      alertIconRef.current.style.display = "none";
      alertTextRef.current.style.color = "#4070F4";
    } else {
      alertTextRef.current.innerText = "Нууц үг таарахгүй байна";
      alertIconRef.current.style.display = "block";
      alertTextRef.current.style.color = "#D93025";
      return;
    }

    const userData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(BACKEND_ENDPOINT, option);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="w-full" id="Header">
      <div className="container grid grid-row grid-flow-col gap-4">
        <div className="flex items-center justify-center ">
          <div className="flex items-center justify-center pl-52 w-[1220px] h-[1020px]">
            <div className="flex justify-center items-center flex-col w-[384px] h-[426px]">
              <div className="flex gap-2">
                <Logo /> <h1 className="font-bold text-[16px]">Geld</h1>
              </div>
              <div className="pt-10">
                <h1 className="text-center text-[24px] font-bold">
                  Create Geld account
                </h1>
                <p className="text-center pt-3">
                  Sign up below to create your Wallet account
                </p>
              </div>
              <form action="" onSubmit={handleOnSubmit}>
                <div className="flex flex-col gap-6 pt-10">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className=" w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className=" w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                    placeholder="Email"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      ref={createPwRef}
                      className=" w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-4 flex items-center text-gray-400"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showRePassword ? "text" : "password"}
                      name="repassword"
                      id="repassword"
                      ref={confirmPwRef}
                      className=" w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-4 flex items-center text-gray-400"
                      onClick={() => setReShowPassword((prev) => !prev)}
                    >
                      {showRePassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {/* <input
                    type="password"
                    name="repassword"
                    id="repassword"
                    ref={confirmPwRef}
                    className=" w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                    placeholder="Re-enter Password"
                  /> */}
                  <div className="flex text-center items-center">
                    <span ref={alertIconRef} style={{ display: "none" }}>
                      ⚠️
                    </span>
                    <span ref={alertTextRef} className="text-sm pl-2"></span>
                  </div>
                  <button className="text-white text-[20px] font-bold bg-[#0166FF] hover:bg-blue-400 rounded-[20px]  w-[384px] h-[48px]">
                    Sign up
                  </button>
                </div>
              </form>

              <div className="flex pt-10 gap-5">
                <p>Already have an account?</p>
                <Link href={`/`}>
                  <button className="text-[#0166FF]">Log in</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#0166FF]  w-[1200px] h-[1200px]"></div>
      </div>
    </div>
  );
};

export default HomePage;
