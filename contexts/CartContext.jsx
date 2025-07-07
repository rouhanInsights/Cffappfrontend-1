import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: 1,
    }));
  };

  const incrementQty = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  const decrementQty = (productId) => {
    setCartItems((prev) => {
      const newQty = prev[productId] - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      return {
        ...prev,
        [productId]: newQty,
      };
    });
  };
  const clearCart = () => {
    setCartItems({});
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
