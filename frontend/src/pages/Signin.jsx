import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// SignIn Component
export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 min-h-screen flex justify-center items-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Sign In
            </h1>
            <p className="text-slate-400">  
              Enter your credentials to access your account
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2 flex flex-col items-center">
              <label className="text-sm font-medium text-slate-300 block text-center">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <label className="text-sm font-medium text-slate-300 block text-center">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end">
                <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                
                </button>
              </div>
            </div>

            <button
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-slate-800"
              onClick={async () => {
                try {
                  const response = await axios.post("http://localhost:5000/user/signin", {
                    username,
                    password
                  });

                  localStorage.setItem("token", response.data.token);
                  navigate("/landingpage");
                } catch (err) {
                  alert("Invalid credentials!");
                }
              }}
            >
              Sign In
            </button>

            <div className="text-center mt-6">
              <p className="text-slate-400">
                Don't have an account?{" "}
                <button
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};