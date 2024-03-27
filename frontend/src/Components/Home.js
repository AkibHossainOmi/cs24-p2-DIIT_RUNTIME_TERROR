import React from "react";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
    <div className="relative flex flex-col items-center justify-center h-screen bg-purple-100"> 
    <Navbar/>
      <h1 className="text-5xl font-bold mb-6 text-purple-700">
        Welcome to EcoSync
      </h1>
      <p className="text-2xl text-center text-purple-800">
      A Revolutionizing Waste Management in Dhaka North City Corporation!
      </p>
      {/* Add more content or features related to Samurai Train Services */}
    </div>
    </>
  );
}
