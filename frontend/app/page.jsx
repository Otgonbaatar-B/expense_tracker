"use client";
import { useRouter } from "next/navigation";
import Login from "./login/page";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");
  //   if (isLoggedIn) {
  //     toast.success("you already login");
  //     router.push("/dashboard");
  //   }
  // }, [router]);
  return (
    <div>
      <ToastContainer />
      <Login />
    </div>
  );
}
