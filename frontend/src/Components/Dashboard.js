import React from "react";
import Navbar from "./Navbar";
import { getLoggedInStatus } from "./Status";

export default function Dashboard() {

  console.log(getLoggedInStatus());
  return (
    <div>
    <Navbar/>
    <h1 className="mt-20 text-3xl font-semibold text-center text-purple-700 underline">
          Dashboard Here
    </h1>
    </div>
  );
}
