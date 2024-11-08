"use client";
import { Logo } from "@/components/icons/Icons";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL;
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setReShowPassword] = useState(false);

  const createPwRef = useRef(null);
  const confirmPwRef = useRef(null);
  const alertTextRef = useRef(null);
  const alertIconRef = useRef(null);

  // const handleOnSubmit = async (event) => {
  //   event.preventDefault();

  //   if (createPwRef.current.value === confirmPwRef.current.value) {
  //     // alertTextRef.current.innerText = "Password matched";
  //     alertIconRef.current.style.display = "none";
  //     alertTextRef.current.style.color = "#4070F4";
  //   } else {
  //     alertTextRef.current.innerText = "Нууц үг таарахгүй байна";
  //     alertIconRef.current.style.display = "block";
  //     alertTextRef.current.style.color = "#D93025";
  //     return;
  //   }

  //   const userData = {
  //     name: event.target.name.value,
  //     email: event.target.email.value,
  //     password: event.target.password.value,
  //   };

  //   const option = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userData),
  //   };

  //   const response = await fetch(BACKEND_ENDPOINT, option);
  //   const data = await response.json();
  //   console.log(data);
  // };

  const formik = useFormik({
    initialValues: {
      name: "",
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
        const response = await fetch(`${DATABASE_URL}/sign-up`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        console.log("data", data);

        if (data.exists) {
          toast.info("Already exists");
          console.log("Already exists");
        }

        if (data.success) {
          console.log("Success triggered");
          toast.success("Successfully created!");

          // Reset form values after successful sign-up
          formik.resetForm();

          // Delay navigation to give time for the toast to display
          // setTimeout(() => {
          //   router.push("/login");
          // }, 1000); // Adjust the delay as needed
        } else {
          setErrorMessage(data.message || "Error occurred");
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
    <div className="w-full" id="Header">
      <ToastContainer />
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
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-6 pt-10">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      ref={createPwRef}
                      className="w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <button
                      type="button" // Correctly set to type="button"
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
                      className="w-[384px] h-[48px] bg-[#F3F4F6] pl-10 rounded-xl border border-gray-300"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <button
                      type="button" // Correctly set to type="button"
                      className="absolute inset-y-0 right-4 flex items-center text-gray-400"
                      onClick={() => setReShowPassword((prev) => !prev)}
                    >
                      {showRePassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  <div className="flex text-center items-center">
                    <span ref={alertIconRef} style={{ display: "none" }}>
                      ⚠️
                    </span>
                    <span ref={alertTextRef} className="text-sm pl-2"></span>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit" // Set type="submit" for the submit button
                    className="text-white text-[20px] font-bold bg-[#0166FF] hover:bg-blue-400 rounded-[20px] w-[384px] h-[48px]"
                  >
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
