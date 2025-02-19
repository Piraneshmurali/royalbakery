"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const initialCartState = {
  products: [], // Array of products in the cart
  totalPrice: 0, // Total price of items in the cart
  totalQty: 0, // Total quantity of items in the cart
};

// Ensure the initial cart structure is valid when fetched from localStorage
const getInitialCart = () => {
  if (typeof localStorage !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    try {
      const parsedCart = JSON.parse(storedCart);
      return parsedCart && parsedCart.products ? parsedCart : initialCartState;
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return initialCartState;
    }
  }
  return initialCartState;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart);

  // Save cart state to localStorage whenever it changes
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Helper function to calculate total price and quantity
  const calculateCartTotals = (updatedCart) => {
    let totalPrice = 0;
    let totalQty = 0;

    updatedCart.products.forEach((product) => {
      totalPrice += product.price * product.quantity;
      totalQty += product.quantity;
    });

    return { ...updatedCart, totalPrice, totalQty };
  };

  // Add a product to the cart
  const addToCart = (product) => {
    if (!product || !product._id) return; // Validate product
    const existingProductIndex = cart.products.findIndex(
      (p) => p._id === product._id
    );
    let updatedProducts = [...cart.products];

    if (existingProductIndex === -1) {
      updatedProducts.push(product);
    } else {
      updatedProducts[existingProductIndex].quantity += product.quantity;
    }

    setCart(calculateCartTotals({ ...cart, products: updatedProducts }));
  };

  // Update quantity of a specific product in the cart
  const updateQuantityInCart = (product, quantity) => {
    const existingProductIndex = cart.products.findIndex(
      (p) => p._id === product._id
    );
    const updatedProducts = [...cart.products];

    if (existingProductIndex !== -1 && quantity > 0) {
      updatedProducts[existingProductIndex].quantity = quantity;
      setCart(calculateCartTotals({ ...cart, products: updatedProducts }));
    }
  };

  // Remove a product from the cart
  const removeFromCart = (id) => {
    const updatedProducts = cart.products.filter((p) => p._id !== id);

    if (updatedProducts.length === 0) {
      clearCart(); // Clear the entire cart if no products are left
    } else {
      setCart(calculateCartTotals({ ...cart, products: updatedProducts }));
    }
  };

  
  const clearCart = () => {
    setCart([]); // Clear state
    localStorage.removeItem("cart"); // Clear local storage
  };


  // const clearCart = () => {
  //   // Reset the cart state to its initial state
  //   setCart(initialCartState);

  //   // Check if localStorage is available in the environment
  //   if (typeof window !== "undefined" && window.localStorage) {
  //     try {
  //       localStorage.removeItem("cart"); // Clear cart data from localStorage
  //     } catch (error) {
  //       console.error("Error removing cart from localStorage:", error);
  //     }
  //   }
  // };

  // Calculate the total price of items in the cart
  const calculateTotal = () => {
    return cart.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Calculate a summary of the cart, including tax and grand total
  const calculateSummary = () => {
    const subtotal = calculateTotal();
    return {
      subtotal: subtotal.toFixed(2),
      tax: (subtotal * 0.1).toFixed(2), // 10% tax
      grandTotal: (subtotal + subtotal * 0.1).toFixed(2),
    };
  };

  // Get the items in the cart
  const getCartItems = () => cart.products;

  // Get the size of the cart (number of items)
  const getCartSize = () =>
    Array.isArray(cart.products) ? cart.products.length : 0;

  // Get the total value of the cart
  const getCartValue = () => cart.totalPrice;

  return (
    <CartContext.Provider
      value={{
        cart: cart || initialCartState, // Ensure cart always has a valid structure
        addToCart,
        removeFromCart,
        clearCart,
        getCartItems,
        getCartSize,
        getCartValue,
        updateQuantityInCart,
        calculateSummary,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the cart context
export const useCart = () => useContext(CartContext);
