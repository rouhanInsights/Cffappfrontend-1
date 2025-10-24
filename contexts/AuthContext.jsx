import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [guestMode, setGuestMode] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false); // ✅ ensures HomeScreen waits

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedGuest = await AsyncStorage.getItem("guestMode");

        console.log("🔍 Loading auth state:", {
          storedToken,
          storedUserId,
          storedGuest,
        });

        if (storedToken) setUserToken(storedToken);
        if (storedUserId) setUserId(storedUserId);

        // ✅ If both exist, force guestMode = false
        if (storedToken && storedUserId) {
          setGuestMode(false);
          console.log("✅ Auth found — logged in user");
        } else {
          setGuestMode(storedGuest === "true");
          console.log("👤 Guest mode active");
        }
      } catch (err) {
        console.error("❌ Failed to load auth data:", err);
      } finally {
        setAuthLoaded(true); // ✅ always signal ready
      }
    };

    loadAuth();
  }, []);

  // ✅ LOGIN with guest cart merge
  const login = async (token, id) => {
    try {
      console.log("🟢 LOGIN CALLED — token:", token, "id:", id);
      if (!token || !id) {
        console.warn("⚠️ Login called with missing values");
      }

      // 🧩 Save base auth info
      setUserToken(token);
      setUserId(id);
      setGuestMode(false);

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", id.toString());
      await AsyncStorage.setItem("guestMode", "false");

      // ✅ Merge guest cart into user cart
      const guestCart = await AsyncStorage.getItem("cart_guest");
      if (guestCart) {
        console.log("🛒 Merging guest cart into user cart...");
        const parsedGuest = JSON.parse(guestCart);
        const userCartKey = `cart_${id}`;
        const existingUserCart = await AsyncStorage.getItem(userCartKey);
        const parsedUser = existingUserCart ? JSON.parse(existingUserCart) : {};

        const mergedCart = { ...parsedUser };
        for (const [pid, item] of Object.entries(parsedGuest)) {
          if (mergedCart[pid]) {
            // Merge quantities if overlapping
            const guestQty = typeof item === "object" ? item.quantity || 0 : item;
            if (typeof mergedCart[pid] === "object") {
              mergedCart[pid].quantity =
                (mergedCart[pid].quantity || 0) + guestQty;
            } else {
              mergedCart[pid] += guestQty;
            }
          } else {
            mergedCart[pid] = item;
          }
        }

        await AsyncStorage.setItem(userCartKey, JSON.stringify(mergedCart));
        await AsyncStorage.removeItem("cart_guest");
        console.log("✅ Guest cart merged successfully");
      }

      // ✅ Verify saved auth info
      const checkToken = await AsyncStorage.getItem("userToken");
      const checkId = await AsyncStorage.getItem("userId");
      console.log("📦 Saved values →", { checkToken, checkId });
      console.log("✅ Login successful");
    } catch (err) {
      console.error("❌ Login save/merge error:", err);
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      console.log("🔓 Logging out...");
      setUserToken(null);
      setUserId(null);
      setGuestMode(false);
      await AsyncStorage.multiRemove(["userToken", "userId", "guestMode"]);
      console.log("✅ Logout complete");
    } catch (err) {
      console.error("❌ Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userId,
        guestMode,
        authLoaded,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
