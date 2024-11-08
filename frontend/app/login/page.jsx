"use client";
import { Logo } from "@/components/icons/Icons";
import Link from "next/link";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage("");
      try {
        const response = await fetch(`${DATABASE_URL}/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        console.log("data", data);

        if (response.ok && data.success) {
          toast.success("Login successful!");
          localStorage.setItem("isLoggedIn", "true");
          router.push("/dashboard");
        } else {
          toast.error("Login failed!");
          // setErrorMessage(data.message || "Invalid credentials");
        }
      } catch (error) {
        setErrorMessage("Network error");
      }
    },
  });

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");
  //   if (isLoggedIn) {
  //     toast.success("you already login");
  //     router.push("/dashboard");
  //   }
  // }, [router]);

  return (
    <div className="w-full">
      <ToastContainer />
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
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-6 pt-10">
                  <input
                    type="text"
                    name="email"
                    className=" w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                    placeholder="Email "
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email ? (
                    <div className="text-red-600">{formik.errors.email}</div>
                  ) : null}
                  <input
                    type="text"
                    name="password"
                    className=" w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.errors.password ? (
                    <div className="text-red-600">{formik.errors.password}</div>
                  ) : null}

                  {errorMessage && (
                    <div className="mb-4 text-red-600">{errorMessage}</div>
                  )}
                  <button
                    type="submit"
                    className="text-white text-[20px] font-bold bg-[#0166FF] hover:bg-blue-400 rounded-[20px]  w-[384px] h-[48px] "
                  >
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
