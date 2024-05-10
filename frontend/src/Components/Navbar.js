import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { clearUserStatus, getLoggedInStatus, setLoggedIn } from "./Status";

export default function Navbar() {
  const isAuthenticated = parseInt(getLoggedInStatus());
  const history = useNavigate();
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = (event) => {
    event.preventDefault();
    setLoggedIn(0);
    clearUserStatus();
    history('/login');
    window.location.reload();
    console.log("Logged out successfully");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <>
      <nav className="fixed flex w-full p-8 bg-purple-500 top-0 h-16 sm:h-16 md:h-16 lg:h-16 xl:h-16">
        <div className="hidden sm:block absolute top-0 right-6 m-4 space-x-4">
          {isAuthenticated >  0? (
            <div className="relative">
              <button className="" onClick={toggleDropdown} >
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAABgYGD8/Pzk5OQkJCQEBAT5+fkICAj29vYnJye9vb3s7Ow1NTXp6enPz8+FhYXV1dVbW1stLS2Tk5M7OzvKysqBgYHDw8OioqJNTU13d3eLi4uWlpYTExNqamqwsLCrq6vd3d1FRUVUVFQdHR1vb288+g1dAAAEv0lEQVR4nO3cCXeiPBQG4IQgiLjhUpdqxW7//yd+WdDRjoOEipfL9z5z2jlTx9O8vSGEECoEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/jlL2Q7l/FH+bLxl0zXoYJVwMlYTp4jWYzWbB6yIdJ+YVEZ9eZczUT+eI091cXprv1ra03PMJG1GEexsviiKbzn2Wo03YhYzmANy8XZXvlFDK3kaw7qW67bp/ivRHviu9tR17mKY0HTBOdhc1+0tfyoU5SvUfjkzC4dIcfv+uoX5pOxRsaxiLbOkKVRrx411wraEIRzpBSQWlG1+XY+qm+nOjRzi4E+9UxtGQ3WhjDkGVBGWDzFVHPcSKY8RdhXSniAvBbf6mG/tSNP5+QDPYZvbcyYgSyae8O8ycSxjJIOY1f9Nt3VTto4Wcus1+dAlHngmX3E6JR8+A7IoYb70TBqyOQxF6B5SS18xmUe1E8Yf+3xvqRnuZ+SbUDtSN9hH6jqTGckjdbA8T/xJG8i2jbraHtE5CuaZutoe9ZzznSN1sD9NaCRfUzfbwWivhlLrZHr47n7BeDXfUzfZQ+fL+CqdJzVHWmNPInLrZHta1avhC3WwP2VeNgIN36mZ7MIv53j4S6mb78B9MI7mibrSXvEYNOU1LdTf1D/jGqpMqsfJOuGO1rK/circXTleHdhdJYFfrK532I3MT9ZvXfVKlRFZ1UV+6u8S8Smh3YKxkv3IN+3LH67aFvd+ZfHnMTUcxv30nqvJijemja263D52ja33ZXozih5BTN7Uepab3qlgcqJwufS/pjvcqyzO61zitXlxLRLyQ9zPuuW1SuKDurZya7BuWY8yF7KOIEv2MZm05XfbepOJk93Z7eqO/8rVPmBdQz1D1FDVcXZfuHHY6ZrcX6m+u/eP9Nvox5vS3+2EXtghbJkSSLS5v7X/uM7uXXXHbgXHHcJLmxzydcLoVWlcn+uYt6vy5mxHPw0o3hpdSXUio/GKwi1zvHMCp854TVm2zKorOKKOIk3FY3ThhdOo3ZXjZrILtaD7oVTOYj7aH6WYiWlxEVZwK9Md77r/z8jyZy8PicGzdypQqIqpJMKidz5gfsrY+B2XHivTTtNL/Dn7BvXG2NkNV+y6rdHsmM+mecqob0bzPrD0ezBJ/y3rpaXe+XR4tXyAtT1i899imflrMNscfNWPdth27KrYhqLuMfenVP/xuiOQ8s/Ha0FVtCfNfjC839WU/Fy0ZbszD6HU2JpQzP6+0HSU0NXx4Bd3yYz9txYB6ekqtERn1dNx99+HvZjH/FslRImgPRvswrAoe3kX/RDwo2odL7XdfNBTvfN+GspuagOPHjzJXGYnXVnXEQ2PxnFfqM0Zz4+hJRhpRic/GEx5oj8NJ4wFl/530fLhrcJg52dMFFCJpciB1IvlFufF0/YyEckKYsN6zMb4IN4Anj72uv8n8jh6SbmrHt1qPVfgjfBAjfUpAyl38zU26r9E98nWovtH5V+iGmicMNNaMLGG13wP1e0uyhM/JF8keWcLS38T2wISDjieUnU/Y/RpSJpTNX1pYHR9pIsqEzwho0CUMZsEzzL7JEgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQA3/ATIJNhm+rhgCAAAAAElFTkSuQmCC" alt="user" className="w-7 h-7" />       
              </button>
              {isDropdownOpen && (
                <div className="absolute px-5 right-0 mt-1 bg-slate-100 shadow-md rounded-md z-10">
                  <ul className="space-y-1">
                    <li>
                      <Link to="/profile" className="px-4 py-2 block hover:bg-gray-200">
                        Profile
                      </Link>
                    </li>
                    <li>
                    {isAuthenticated === 1 && <Link to="/control" className="whitespace-nowrap px-4 py-2 block hover:bg-gray-200">
                      Control Panel
                    </Link>}
                    {isAuthenticated === 2 && <Link to="/vehicle_entries" className="whitespace-nowrap px-4 py-2 block hover:bg-gray-200">
                      STS Entries
                    </Link>}
                    {isAuthenticated === 3 && <Link to="/vehicle_entries" className="whitespace-nowrap px-4 py-2 block hover:bg-gray-200">
                      Landfill Entries
                    </Link>}

                    {isAuthenticated === 5 && <Link to="/create_employee" className="whitespace-nowrap px-4 py-2 block hover:bg-gray-200">
                      Create Employee
                    </Link>}
                    {isAuthenticated === 5 && <Link to="/all_employee" className="whitespace-nowrap px-4 py-2 block hover:bg-gray-200">
                      All Employe
                    </Link>}
                    {isAuthenticated === 5 && <Link to="/monitoring_employee" className="whitespace-nowrap px-4 py-2 block hover:bg-gray-200">
                      Monitoring Employee
                    </Link>}
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 block text-red-500 hover:bg-red-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white text-lg hover: ">
                Login
              </Link>
              <Link to="/registration" className="text-white text-lg hover: ">
                Signup
              </Link>
            </>
          )}
        </div>

        <div className="hidden sm:flex absolute top-0 m-4 space-x-4 items-center">
          <Link to="/" className="text-white font-bold text-lg hover:  flex items-center">
              <img src="data:image/png;base64,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" alt="EcoSync Logo" className="h-8 mr-2" />
              EcoSync
          </Link>
          <Link to="/" className="pl-5 text-white text-lg hover: ">
              Home
          </Link>
          <Link to="/about" className="text-white text-lg hover: ">
              About
          </Link>
          {isAuthenticated > 0 && (
              <Link to="/dashboard" className="text-white text-lg hover: ">
                  Dashboard
              </Link>
          )}
      </div>

        <div className="sm:hidden flex items-center w-full">
          <button className="text-white" onClick={toggleDropdown}>
            ☰
          </button>
          {isDropdownOpen && (
            <div className="shadow-md rounded-md h-full top-10 absolute left-0">
              <ul className="bg-purple-500 p-0 space-y-1 py-5 w-screen flex flex-col items-center justify-center">
                <li>
                  <Link to="/" className="ml-8 text-white text-lg hover: ">
                    Home
                  </Link>
                </li>
                {/* <li>
                  <Link to="/trains" className="ml-8 text-white text-lg hover: ">
                    Trains
                  </Link>
                </li>
                <li>
                  <Link to="/stations" className="ml-8 text-white text-lg hover: ">
                    Stations
                  </Link>
                </li> */}
                {isAuthenticated > 0? (
                  <>
                  <li>
                    <Link to="/dashboard" className="ml-8 text-white text-lg hover: ">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="ml-8 text-white text-lg hover: ">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={handleLogout} className="ml-8 text-white text-lg hover: ">
                      Logout
                    </Link>
                  </li>
                  </>):( <>
                  <li>
                    <Link to="/login" className="ml-8 text-white text-lg hover: ">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/registration" className="ml-8 text-white text-lg hover: ">
                      Signup
                    </Link>
                  </li>
                  </>
                )}
              </ul>
            </div>
          )}

        </div>
      </nav>
    </>
  );
}
