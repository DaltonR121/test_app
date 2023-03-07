import { React, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("demo@pairtree.com");
  const [password, setPassword] = useState("ReallyStrongPassword");

  function handleSubmit(event) {
    event.preventDefault();
  
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        if (response.ok) {
          response.json()
          .then(user => window.location.href = `/${user.id}`);
        } else {
          // handle error
          console.error('Login failed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12">
      <div className="text-center">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                />
              </div>
            </div>
            <div className="flex items-center justify-evenly">
              <button className="bg-button hover:bg-button-hover text-white py-2 px-5 rounded" onClick={handleSubmit}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
