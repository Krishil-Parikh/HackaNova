import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("  ");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    return (
      <div className="bg-slate-900 min-h-screen flex justify-center items-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Sign Up
              </h1>
              <p className="text-slate-400">
                Enter your information to create the account
              </p>
            </div>
  
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
  
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
  
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">Email</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
  
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 block">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
  
              <button
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-slate-800"
                onClick={async () => {
                  try {
                    const response = await axios.post("http://localhost:5000/user/signup", {
                      username,
                      firstName,
                      lastName,
                      password
                    });
  
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("username", response.data.username);
                    navigate("/dashboard");
                  } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    console.error("Signup failed:", errorMessage);
                    alert(`Signup failed: ${errorMessage}`);
                  }
                }}
              >
                Sign Up
              </button>
  
              <div className="text-center mt-6">
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <button
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    onClick={() => navigate("/signin")}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };