import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, ShoppingCart, CheckCircle } from "lucide-react";
import { Form, Input, Select } from "antd";
import "./Checkout.css";
import { useCart } from "./CartContext";

const { TextArea } = Input;

const Checkout = () => {
  const [form] = Form.useForm();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || {};
    const products = cartData.products || [];
    setCart(products);
  }, []);

  const handleSubmitOrder = async (values) => {
    setLoading(true);

    try {
      const orders = cart.map((item, index) => ({
        cakeId: item._id,
        name: item.name,
        price: item.price,
        toppings: values[`toppings_${index}`],
        message: values[`message_${index}`],
        occasion: values[`occasion_${index}`],
        type: values[`type_${index}`],
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        address: values.address,
      }));

      // for (const order of orders) {
      const res = await axios.post("http://localhost:5000/api/customer/order", {
        orders,
      });
      // }

      
      if (res.status === 200 || res.status === 201) {
        setShowOrderConfirmation(true);
        clearCart(); // This will clear both localStorage and state
      }
  //  }  catch (error) {
  //     console.error("Error placing orders:", error);
  //     alert("Failed to place the orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowOrderConfirmation(false);
    navigate("/");
  };

  const inputStyle = {
    backgroundColor: "#2C2C2D",
    color: "white",
    border: "none",
  };

  const selectStyle = {
    ...inputStyle,
    "& .ant-select-selector": {
      backgroundColor: "#2C2C2D !important",
      color: "white !important",
      border: "none !important",
    },
  };

  // Custom style to hide antd form label
  const formItemStyle = {
    marginBottom: "0",
    "& .ant-form-item-label": {
      display: "none",
    },
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#171718]">
        <div className="text-center text-white">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-[#8B7355]" />
          <h2 className="text-2xl cormorant-garamond-medium  mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-400 mb-4 cormorant-garamond-medium ">
            Add some delicious cakes to your cart!
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#8B7355] text-white cormorant-garamond-medium px-6 py-2 rounded hover:bg-[#7A6548] transition-colors duration-300"
          >
            Browse Cakes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171718] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl  text-white  cormorant-garamond-medium mb-8 text-center uppercase">
          Checkout
        </h2>

        <Form form={form} onFinish={handleSubmitOrder}>
          <div className="bg-[#1C1C1D] p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl cormorant-garamond-medium  text-white mb-4">
              Your Order
            </h3>
            {cart.map((cake, index) => (
              <div
                key={index}
                className="mb-6 pb-6 border-b border-[#8B7355]/20 last:border-b-0"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={cake.photo || "/placeholder.svg?height=100&width=100"}
                    alt={cake.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h4 className="text-xl jost-font text-white mb-2">
                      {cake.name}
                    </h4>
                    <p className="text-[#8B7355] mb-2">
                      {cake.price.toFixed(2)} LKR
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Form.Item
                        name={`toppings_${index}`}
                        rules={[
                          { required: true, message: "Please enter toppings" },
                        ]}
                        style={formItemStyle}
                      >
                        <Input
                          placeholder="Toppings"
                          style={inputStyle}
                          className="placeholder-gray-500"
                        />
                      </Form.Item>
                      <Form.Item
                        name={`message_${index}`}
                        rules={[
                          { required: true, message: "Please enter message" },
                        ]}
                        style={formItemStyle}
                      >
                        <Input
                          placeholder="Message on Cake"
                          style={inputStyle}
                          className="placeholder-gray-500"
                        />
                      </Form.Item>
                      <Form.Item
                        name={`occasion_${index}`}
                        rules={[
                          { required: true, message: "Please select occasion" },
                        ]}
                        style={formItemStyle}
                      >
                        <Select
                          placeholder="Select Occasion"
                          style={selectStyle}
                          className="bg-[#2C2C2D] placeholder-slate-500 text-white"
                          dropdownStyle={{
                            backgroundColor: "#2C2C2D !important ",
                            color: "white !important ",
                          }}
                        >
                          <Select.Option value="Birthday">
                            Birthday
                          </Select.Option>
                          <Select.Option value="Wedding">Wedding</Select.Option>
                          <Select.Option value="Anniversary">
                            Anniversary
                          </Select.Option>
                          <Select.Option value="Festival">
                            Festival
                          </Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={`type_${index}`}
                        rules={[
                          { required: true, message: "Please select type" },
                        ]}
                        style={formItemStyle}
                      >
                        <Select
                          placeholder="Select Type"
                          style={selectStyle}
                          className="bg-[#2C2C2D]  text-white"
                          dropdownStyle={{
                            backgroundColor: "#2C2C2D !important",
                            color: "white !important",
                          }}
                        >
                          <Select.Option value="Veg">Veg</Select.Option>
                          <Select.Option value="Non-Veg">Non-Veg</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#1C1C1D] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl  text-white mb-4 cormorant-garamond-medium ">
              Customer Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Form.Item
                name="customerName"
                rules={[{ required: true, message: "Please enter your name" }]}
                style={formItemStyle}
              >
                <Input
                  placeholder="Your Name"
                  style={inputStyle}
                  className="placeholder-gray-500"
                />
              </Form.Item>
              <Form.Item
                name="customerPhone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                ]}
                style={formItemStyle}
              >
                <Input
                  placeholder="Your Phone"
                  style={inputStyle}
                  className="placeholder-gray-500"
                />
              </Form.Item>
            </div>
            <Form.Item
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
              style={formItemStyle}
            >
              <TextArea
                placeholder="Your Address"
                rows={4}
                style={inputStyle}
                className="placeholder-gray-500 mb-6"
              />
            </Form.Item>
            <button
              type="submit"
              className="w-full bg-[#8B7355] text-white py-3 rounded flex items-center justify-center space-x-2 hover:bg-[#7A6548] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 " />
                  <span className="cormorant-garamond-medium">
                    {" "}
                    Place Order
                  </span>
                </>
              )}
            </button>
          </div>
        </Form>
      </div>

      {showOrderConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1C1C1D] p-8 rounded-lg text-center max-w-md w-full">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[#8B7355]" />
            <h2 className="text-2xl  text-white mb-4">Order Confirmed!</h2>
            <p className="text-gray-400 mb-6">
              Your delicious cakes are being prepared with love and care. Thank
              you for your order! <br />
              Note: Once your order is placed, we will call you to confirm the
              details. 😊
            </p>
            <button
              onClick={handleCloseConfirmation}
              className="bg-[#8B7355] text-white px-6 py-2 rounded hover:bg-[#7A6548] transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
