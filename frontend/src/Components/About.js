import React from "react";
import Navbar from "./Navbar";

export default function About() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-screen bg-purple-100"> 
        <Navbar/>
        <h1 className="text-5xl font-bold mb-6 text-purple-700">
          About EcoSync
        </h1>
        <p className="text-2xl text-center text-purple-800">
          EcoSync is a cutting-edge waste management solution that aims to revolutionize waste management in Dhaka North City Corporation. Our mission is to create a sustainable and eco-friendly environment by implementing innovative waste management techniques and technologies.
        </p>
        {/* Add more content or features related to EcoSync */}
      </div>
    </>
  );
}
