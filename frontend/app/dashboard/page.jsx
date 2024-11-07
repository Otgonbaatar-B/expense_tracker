"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      toast.success("You already login");
      router.push("/dashboard");
    }
  }, [router]);
  return (
    <div>
      <ToastContainer />
      Dashboard
    </div>
  );
};

export default Dashboard;
