import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null); // State to store the order being edited
  const [updatedDetails, setUpdatedDetails] = useState({}); // State for storing updated details

  useEffect(() => {
    // Fetch orders along with cake details from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(response.data); // Assign fetched orders to state
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleEditOrder = (order) => {
    setEditOrder(order); // Set the order to be edited
    setUpdatedDetails(order); // Populate the form with current order details
  };

  const handleUpdateOrder = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/orders/${editOrder._id}`,
        updatedDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the order list with the updated order
      setOrders(
        orders.map((order) =>
          order._id === editOrder._id ? { ...response.data } : order
        )
      );

      // Reset editing state
      setEditOrder(null);
      setUpdatedDetails({});
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Orders List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Customer Name</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Message</th>
              <th className="py-3 px-6 text-left">Occasion</th>
              <th className="py-3 px-6 text-left">Cake Name</th>
              <th className="py-3 px-6 text-left">Cake Price</th>
              <th className="py-3 px-6 text-left">Cake Photo</th>
              <th className="py-3 px-6 text-left">Toppings</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{order.customerName}</td>
                <td className="py-3 px-6 text-left">{order.customerPhone}</td>
                <td className="py-3 px-6 text-left">{order.address}</td>
                <td className="py-3 px-6 text-left">{order.message}</td>
                <td className="py-3 px-6 text-left">{order.occasion}</td>
                <td className="py-3 px-6 text-left">{order.cakeId?.name || "No Cake Name"}</td>
                <td className="py-3 px-6 text-left">Rs {order.cakeId?.price || "N/A"}</td>
                <td className="py-3 px-6 text-left">
                  {order.cakeId?.photo ? (
                    <img
                      src={order.cakeId.photo}
                      alt={order.cakeId.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {order.toppings?.join(", ") || "No Toppings"}
                </td>
                <td className="py-3 px-6 text-left">{order.status}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEditOrder(order)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Order */}
      {editOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Order</h3>
            <label className="block mb-2">
              Customer Name:
              <input
                type="text"
                value={updatedDetails.customerName || ""}
                onChange={(e) =>
                  setUpdatedDetails({ ...updatedDetails, customerName: e.target.value })
                }
                className="w-full border border-gray-300 rounded p-2"
              />
            </label>
            <label className="block mb-2">
              Phone:
              <input
                type="text"
                value={updatedDetails.customerPhone || ""}
                onChange={(e) =>
                  setUpdatedDetails({ ...updatedDetails, customerPhone: e.target.value })
                }
                className="w-full border border-gray-300 rounded p-2"
              />
            </label>
            <label className="block mb-2">
              Address:
              <input
                type="text"
                value={updatedDetails.address || ""}
                onChange={(e) =>
                  setUpdatedDetails({ ...updatedDetails, address: e.target.value })
                }
                className="w-full border border-gray-300 rounded p-2"
              />
            </label>
            <label className="block mb-2">
              Status:
              <select
                value={updatedDetails.status || ""}
                onChange={(e) =>
                  setUpdatedDetails({ ...updatedDetails, status: e.target.value })
                }
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setEditOrder(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateOrder}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
