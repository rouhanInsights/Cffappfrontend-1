import React, { useEffect } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { useInAppUpdate } from "../hooks/useInAppUpdate"; // ✅ in-app update hook

export default function SplashScreen({ navigation }) {
  const { UpdatePrompt, checking } = useInAppUpdate({
    updateType: "flexible", // can switch to "immediate" for force update
    checkOnMount: true,
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken"); // ✅ fixed key
        const guestMode = await AsyncStorage.getItem("guestMode");

        console.log("🟢 Splash check:", { token, guestMode });

        // Add a small delay to show logo visibly
        setTimeout(() => {
          if (token) {
            console.log("✅ Authenticated user found, opening Main");
            navigation.replace("Main"); // logged-in user
          } else if (guestMode === "true") {
            console.log("🟡 Guest mode enabled, opening Main");
            navigation.replace("Main"); // allow guest browsing
          } else {
            console.log("🔴 No token, opening Auth flow");
            navigation.replace("Auth"); // login/onboarding
          }
        }, 1800);
      } catch (err) {
        console.error("Auto-login error:", err);
        navigation.replace("Auth");
      }
    };

    // Only run after update check completes
    if (!checking) checkLoginStatus();
  }, [checking]);

  const logoimg = resolveAssetSource(require("../images/logo.jpg"));

  return (
    <View style={styles.container}>
      <Image source={logoimg} style={{ width: 350, height: 120 }} />
      {checking && (
        <ActivityIndicator
          size="large"
          color="#006B3D"
          style={{ marginTop: 20 }}
        />
      )}

      {/* ✅ Render update prompt modal if needed */}
      <UpdatePrompt />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdfffeff",
  },
});
