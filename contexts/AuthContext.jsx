import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [guestMode, setGuestMode] = useState(false);

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = await AsyncStorage.getItem("userToken");
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedGuest = await AsyncStorage.getItem("guestMode");

      if (storedToken) setUserToken(storedToken);
      if (storedUserId) setUserId(storedUserId);
      if (storedGuest === "true") setGuestMode(true);
    };
    loadAuth();
  }, []);

  const login = async (token, id) => {
    setUserToken(token);
    setUserId(id);
    setGuestMode(false);
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("userId", id.toString());
    await AsyncStorage.setItem("guestMode", "false");
  };

  const logout = async () => {
    setUserToken(null);
    setUserId(null);
    setGuestMode(false);
    await AsyncStorage.multiRemove(["userToken", "userId", "guestMode"]);
  };

  return (
    <AuthContext.Provider value={{ userToken, userId, guestMode, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
