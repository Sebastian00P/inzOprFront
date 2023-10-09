import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, Guest } from './utils/AuthContext';
import useLogout from '../domain/useCase/useLogout';

const Navbar: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout()
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const isUserLoggedIn = useCallback(() => {
    return user.role == "User" || user.role == "Admin"
  }, [user])

  const handleLogout = useCallback(() => {
    logout()
    setUser(Guest)
    navigate("/")
  }, [])

  return (
    <nav className="flex justify-between px-10 py-5 items-center">
      <h1 className="text-xl text-gray-800 font-bold">Not empik</h1>
      <div className="flex items-center">
        <ul className="flex items-center space-x-6">
          <Link className="font-semibold text-gray-700" to={"/"}>Books</Link>
          {
            isUserLoggedIn() ? (
              <>
                <Link className="font-bold text-gray-700" to={"/myBooks"}>My books</Link>

                <div className="font-bold text-gray-700">
                  <button
                    onClick={handleLogout}
                    className="font-bold bg-purple-300 rounded p-2 text-white"
                  >
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to={"/login"} className="font-bold bg-purple-300 rounded p-2 text-white">Login</Link>
                <Link to={"/register"} className="font-bold bg-black rounded p-2 text-white">Register</Link>
              </>
            )
          }
        </ul>
      </div>
    </nav>
  )
};

export default Navbar;