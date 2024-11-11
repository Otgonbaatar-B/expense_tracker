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
      toast.success("Amjilttai newterlee");
      router.push("/dashboard");
    }
  }, [router]);
  return (
    <div className="h-screen border border-red-500">
      <ToastContainer />
      Dashboard
    </div>
  );
};

export default Dashboard;
