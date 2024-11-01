"use client";
import { Logo } from "@/components/icons/Icons";
import Link from "next/link";
const Login = () => {
  const DATABASE_URL = "http://localhost:8888/sign-in";

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      name: event.target.name.value,
      password: event.target.password.value,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(DATABASE_URL, option);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="w-full">
      <div className="container grid grid-row grid-flow-col gap-4">
        <div className="flex items-center justify-center ">
          <div className="flex items-center justify-center pl-52  w-[1220px] h-[1020px]">
            <div className="flex justify-center items-center flex-col w-[384px] h-[426px]">
              <div className="flex gap-2">
                <Logo /> <h1 className="font-bold text-[16px]">Geld</h1>
              </div>
              <div className="pt-10">
                <h1 className="text-center text-[24px] font-bold">
                  Welcome Back
                </h1>
                <p className="text-center pt-3">
                  Welcome back, Please enter your details
                </p>
              </div>
              <form action="" onSubmit={handleOnSubmit}>
                <div className="flex flex-col gap-6 pt-10">
                  <input
                    type="text"
                    name="name"
                    className=" w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                    placeholder="Email "
                  />
                  <input
                    type="text"
                    name="password"
                    className=" w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                    placeholder="Password"
                  />
                  <button className="text-white text-[20px] font-bold bg-[#0166FF] hover:bg-blue-400 rounded-[20px]  w-[384px] h-[48px] ">
                    Log in
                  </button>
                </div>
              </form>

              <div className="flex pt-10 gap-5">
                <p>Don’t have account?</p>
                <Link href={`/signup`}>
                  <button className="text-[#0166FF]">Sign up</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#0166FF] w-[1008px] h-[1150px]"></div>
      </div>
    </div>
  );
};

export default Login;
