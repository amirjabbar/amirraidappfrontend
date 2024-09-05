import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";

const Dashboard = () => {
  return (
    <div className="dashboard h-[100vh] bg-[#1c1e33]">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Dashboard;
