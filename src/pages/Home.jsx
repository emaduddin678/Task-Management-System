import React from "react";
import Navbar from "../components/Navbar/Navbar";
import bg from "../assets/task.png"

const Home = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <img src={bg} alt="" className="w-full  h-full"  />
    </div>
  );
};

export default Home;
