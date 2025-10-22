import { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import InAppUpdate from "react-native-in-app-update";

/**
 * useInAppUpdate Hook
 * --------------------
 * Checks for Play Store updates and triggers an update prompt.
 *
 * Props:
 * - updateType: "immediate" (force update) or "flexible" (optional)
 * - checkOnMount: automatically check when the component mounts
 */

export const useInAppUpdate = ({
  updateType = "immediate",
  checkOnMount = true,
} = {}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [checking, setChecking] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if (checkOnMount) checkForUpdate();
  }, []);

  const checkForUpdate = async () => {
    try {
      // ✅ Skip on iOS or emulator/debug build
      if (Platform.OS !== "android" || !InAppUpdate?.checkUpdateAvailability) {
        console.log("ℹ️ In-app update not available (emulator or debug build).");
        return;
      }

      setChecking(true);
      const result = await InAppUpdate.checkUpdateAvailability();
      console.log("🔍 In-app update check:", result);

      if (result.shouldUpdate) {
        setUpdateAvailable(true);

        if (updateType === "immediate") {
          // 🚀 Force update
          InAppUpdate.startUpdate({
            updateType: InAppUpdate.IMMEDIATE,
          });
        } else {
          // 💡 Flexible (show prompt)
          setShowPrompt(true);
        }
      }
    } catch (err) {
      console.log("⚠️ In-app update check failed:", err);
    } finally {
      setChecking(false);
    }
  };

  const startFlexibleUpdate = async () => {
    try {
      if (!InAppUpdate?.startUpdate) return;
      setShowPrompt(false);
      await InAppUpdate.startUpdate({
        updateType: InAppUpdate.FLEXIBLE,
      });
    } catch (err) {
      console.log("⚠️ Flexible update failed:", err);
    }
  };

  const UpdatePrompt = () => (
    <Modal visible={showPrompt} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Update Available 🚀</Text>
          <Text style={styles.message}>
            A newer version of the app is available. Please update to get the
            latest features and improvements.
          </Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.updateBtn]}
              onPress={startFlexibleUpdate}
            >
              <Text style={styles.btnText}>Update Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelBtn]}
              onPress={() => setShowPrompt(false)}
            >
              <Text style={styles.cancelText}>Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return {
    checkForUpdate,
    checking,
    updateAvailable,
    UpdatePrompt,
  };
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },
  message: {
    fontSize: 14,
    color: "#444",
    marginBottom: 20,
    lineHeight: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  updateBtn: {
    backgroundColor: "#006B3D",
    marginRight: 10,
  },
  cancelBtn: {
    backgroundColor: "#eee",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelText: {
    color: "#444",
    fontWeight: "500",
  },
});
