import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { userId, guestMode, authLoaded } = useAuth();
  const [cartItems, setCartItems] = useState({});

  // 🔹 Consistent key naming with AuthContext
  const getCartKey = () => {
    if (userId) return `cart_${userId}`; // ✅ matches AuthContext merge key
    return "cart_guest";
  };

  // 🔹 Load cart on auth or user change
  useEffect(() => {
    const loadCart = async () => {
      if (!authLoaded) return;
      const key = getCartKey();

      try {
        const storedCart = await AsyncStorage.getItem(key);
        const parsed = storedCart ? JSON.parse(storedCart) : {};
        setCartItems(parsed);
        console.log(`🛒 Loaded cart from ${key}:`, parsed);
      } catch (err) {
        console.error("❌ Failed to load cart:", err);
        setCartItems({});
      }
    };

    loadCart();
  }, [authLoaded, userId, guestMode]);

  // 🔹 Persist cart on changes
  useEffect(() => {
    const saveCart = async () => {
      const key = getCartKey();
      if (!key) return;
      try {
        await AsyncStorage.setItem(key, JSON.stringify(cartItems));
        console.log(`💾 Cart saved to ${key}`);
      } catch (err) {
        console.error("❌ Failed to save cart:", err);
      }
    };

    if (authLoaded) saveCart();
  }, [cartItems, userId, guestMode, authLoaded]);

  // 🧩 Normalize items for safe structure
  const normalizeItem = (id, itemOrQty) => {
    if (typeof itemOrQty === "object") return itemOrQty;
    return { id, quantity: itemOrQty, name: "", price: 0, image: "" };
  };

  // 🔹 Add item
  const addToCart = (item) => {
    const id = item.id?.toString() || item.product_id?.toString();
    if (!id) return;

    setCartItems((prev) => {
      const existing = normalizeItem(id, prev[id]);
      return {
        ...prev,
        [id]: {
          ...item,
          quantity: (existing.quantity || 0) + 1,
        },
      };
    });
  };

  // 🔹 Increment item
  const incrementQty = (id) => {
    const key = id.toString();
    setCartItems((prev) => {
      const existing = normalizeItem(key, prev[key]);
      if (!existing) return prev;
      return {
        ...prev,
        [key]: { ...existing, quantity: (existing.quantity || 0) + 1 },
      };
    });
  };

  // 🔹 Decrement item (remove if 0)
  const decrementQty = (id) => {
    const key = id.toString();
    setCartItems((prev) => {
      const existing = normalizeItem(key, prev[key]);
      if (!existing) return prev;

      const newQty = (existing.quantity || 0) - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }
      return {
        ...prev,
        [key]: { ...existing, quantity: newQty },
      };
    });
  };

  // 🔹 Clear cart for current session
  const clearCart = async () => {
    const key = getCartKey();
    setCartItems({});
    if (key) await AsyncStorage.removeItem(key);
    console.log(`🗑️ Cleared cart: ${key}`);
  };

  // 🔹 Get total quantity
  const getTotalQuantity = () =>
    Object.values(cartItems).reduce((sum, item) => {
      if (typeof item === "number") return sum + item; // legacy
      return sum + (item.quantity ?? 0);
    }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        incrementQty,
        decrementQty,
        clearCart,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
