import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null); // ✅ store userId separately

  // ✅ When app starts, load saved token and userId
  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = await AsyncStorage.getItem("userToken");
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedToken) setUserToken(storedToken);
      if (storedUserId) setUserId(storedUserId);
    };
    loadAuth();
  }, []);

  // ✅ Login now saves both token and userId
  const login = async (token, id) => {
    setUserToken(token);
    setUserId(id);
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("userId", id.toString());
  };

  // ✅ Logout clears both token and userId
  const logout = async () => {
    setUserToken(null);
    setUserId(null);
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ userToken, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
