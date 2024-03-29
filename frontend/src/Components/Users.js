import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from './Navbar'; // Import Navbar component

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setUsers(data.data);
        } else {
          console.error('Error fetching users:', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-screen bg-purple-100"> 
        <Navbar />
        <div className="mt-8">
          <h1 className="text-3xl font-semibold text-center text-purple-700 pb-5">
            User List
          </h1>
          <table className="border-collapse border border-purple-800">
            <thead>
              <tr>
                <th className="border border-purple-800 px-4 py-2">User ID</th>
                <th className="border border-purple-800 px-4 py-2">Username</th>
                <th className="border border-purple-800 px-4 py-2">Email</th>
                <th className="border border-purple-800 px-4 py-2">Role</th>
                <th className="border border-purple-800 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.userId}>
                  <td className="border border-purple-800 px-4 py-2">{user.userId}</td>
                  <td className="border border-purple-800 px-4 py-2">{user.username}</td>
                  <td className="border border-purple-800 px-4 py-2">{user.email}</td>
                  <td className="border border-purple-800 px-4 py-2">{user.role}</td>
                  <td className="border border-purple-800 px-4 py-2">
                    <Link to={`/user/${user.userId}`}>
                      <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
