"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { VectorIcon } from "@/components/icons/Icons";
import { Plus } from "@/components/icons/Plus";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in when component mounts
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn) {
      setIsLoggedIn(true);
      toast.success("Амжилттай нэвтэрлээ");
    } else {
      router.push("/login"); // Redirect to login if not logged in
    }
  }, [router]);

  // Doughnut chart data and config
  const data = {
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
    labels: ["Red", "Blue", "Yellow"],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right", // Set the legend position to the right
        labels: {
          boxWidth: 20, // Size of the color box
          padding: 20, // Space between the color box and the label
        },
      },
    },
  };

  return (
    <div className="flex flex-col w-full h-auto">
      <div className="flex w-full h-[72px] px-[120px] py-4 border bg-[#fff] justify-between">
        <div className="flex gap-6">
          <VectorIcon />
          <button className="text-[#0F172A] text-base font-normal">
            Dashboard
          </button>
          <button className="text-[#0F172A] text-base font-normal">
            Records
          </button>
        </div>
        <div className="flex">
          <button className="text-[#fff] text-base font-normal btn bg-blue-600 hover:bg-blue-500">
            <Plus />
            Record
          </button>
        </div>
      </div>
      <ToastContainer />
      {/* {isLoggedIn && (
        <div className="w-72 h-72">
          <h1>Welcome to the Dashboard</h1>
          <Doughnut data={data} options={options} />
        </div>
      )} */}
    </div>
  );
};

export default Dashboard;
