import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h2>
      <div className="space-y-4">
        <Link
          to="/add-cake"
          className="block bg-indigo-600 text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-indigo-700 transition duration-200"
        >
          Add Cake
        </Link>
        <Link
          to="/cakes"
          className="block bg-indigo-600 text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-indigo-700 transition duration-200"
        >
          View Cakes
        </Link>
        <Link
          to="/orders"
          className="block bg-indigo-600 text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-indigo-700 transition duration-200"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
