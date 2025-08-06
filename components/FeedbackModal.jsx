import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@env";
import styles from "../styles/FeedbackModalStyles"; // ⬅️ import styles

const BASE_URL = API_BASE_URL;

export default function FeedbackModal({ visible, onClose, orderId, onFeedbackSubmitted }) {
  const [ratingProduct, setRatingProduct] = useState(0);
  const [ratingDA, setRatingDA] = useState(0);
  const [commentProduct, setCommentProduct] = useState("");
  const [commentDA, setCommentDA] = useState("");

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!ratingProduct || !ratingDA || !commentProduct || !commentDA) {
      Alert.alert("Validation", "Please provide ratings and comments for both.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id: orderId,
          rating_product: ratingProduct,
          comment_product: commentProduct,
          rating_da: ratingDA,
          comment_da: commentDA,
        }),
      });

      if (res.ok) {
        Alert.alert("Success", "Feedback submitted.");

        // Reset form
        setRatingProduct(0);
        setRatingDA(0);
        setCommentProduct("");
        setCommentDA("");

        // Trigger parent update
        if (onFeedbackSubmitted) {
          onFeedbackSubmitted(orderId);
        }

        // Close modal
        onClose();
      } else {
        throw new Error("Submit failed");
      }
    } catch (err) {
      console.error("Feedback error:", err);
      Alert.alert("Error", "Could not submit feedback");
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Feedback</Text>

          <Text style={styles.label}>Product Rating:</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((val) => (
              <TouchableOpacity key={val} onPress={() => setRatingProduct(val)}>
                <Ionicons
                  name={val <= ratingProduct ? "star" : "star-outline"}
                  size={24}
                  color={val <= ratingProduct ? "#facc15" : "#ccc"}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            value={commentProduct}
            onChangeText={setCommentProduct}
            placeholder="Write about the product"
            multiline
          />

          <Text style={styles.label}>Delivery Agent Rating:</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((val) => (
              <TouchableOpacity key={val} onPress={() => setRatingDA(val)}>
                <Ionicons
                  name={val <= ratingDA ? "star" : "star-outline"}
                  size={24}
                  color={val <= ratingDA ? "#facc15" : "#ccc"}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            value={commentDA}
            onChangeText={setCommentDA}
            placeholder="Write about the delivery agent"
            multiline
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
