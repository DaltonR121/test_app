import React, { useState, useEffect } from "react";
import logo from "../assets/PairTree_logo.svg";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          response.json().then(res => {
            console.log(res)
            res.user_id ? setIsLoggedIn(true) : setIsLoggedIn(false);
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <nav className="flex justify-between px-10 py-4">
      <a href="/">
        <img src={logo} alt="PairTree Logo" />
      </a>
      <div className="flex justify-even">
        {isLoggedIn ? (
          <button className="bg-button hover:bg-button-hover text-white text-2xl rounded w-24 h-10 m-2">
            <a href="/logout">Logout</a>
          </button>
        ) : (
          <div>
            <button className="bg-button hover:bg-button-hover text-white text-2xl rounded w-24 h-10 m-2">
              <a href="/login">Login</a>
            </button>
            <button
              className="bg-button opacity-50 cursor-not-allowed hover:bg-button-hover text-white text-2xl rounded w-24 h-10 m-2"
              disabled={true}
            >
              <a href="/signup">Signup</a>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
