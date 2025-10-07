import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { userId } = useAuth(); // ✅ simplified
  const [cartItems, setCartItems] = useState({});

  // ✅ Load cart when userId changes
  useEffect(() => {
    const loadCart = async () => {
      if (userId) {
        const storedCart = await AsyncStorage.getItem(`cart_${userId}`);
        setCartItems(storedCart ? JSON.parse(storedCart) : {});
      } else {
        setCartItems({});
      }
    };
    loadCart();
  }, [userId]);

  // ✅ Persist cart per userId
  useEffect(() => {
    if (userId) {
      AsyncStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const addToCart = (productId) =>
    setCartItems((prev) => ({
      ...prev,
      [productId]: prev[productId] ? prev[productId] + 1 : 1,
    }));

  const incrementQty = (productId) =>
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));

  const decrementQty = (productId) =>
    setCartItems((prev) => {
      const newQty = (prev[productId] || 0) - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      return { ...prev, [productId]: newQty };
    });

  const clearCart = async () => {
    setCartItems({});
    if (userId) await AsyncStorage.removeItem(`cart_${userId}`);
  };

  const getTotalQuantity = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        incrementQty,
        decrementQty,
        getTotalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
