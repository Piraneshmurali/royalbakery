import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
//
  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:5000/api/Admin/login", {
          username,
          password,
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard"); // Navigate to dashboard after successful login
      } else {
        const response = await axios.post("http://localhost:5000/api/admin/register", {
          username,
          password,
        });
        setMessage(response.data.message || "Admin registered successfully!");
        setTimeout(() => navigate("/login"), 1000); // Navigate to login after a delay
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || (isLogin ? "Invalid credentials" : "Error registering admin")
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 text-lg font-medium rounded-tl-lg ${
              isLogin ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 text-lg font-medium rounded-tr-lg ${
              !isLogin ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? "Admin Login" : "Admin Signup"}
          </h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              isLogin ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Not a member?" : "Already a member?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            {isLogin ? "Signup now" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
