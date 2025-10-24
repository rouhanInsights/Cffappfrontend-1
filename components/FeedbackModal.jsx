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
import styles from "../styles/FeedbackModalStyles";

const BASE_URL = API_BASE_URL;

export default function FeedbackModal({
  visible,
  onClose,
  orderId,
  onFeedbackSubmitted,
}) {
  const [ratingProduct, setRatingProduct] = useState(0);
  const [ratingDA, setRatingDA] = useState(0);
  const [commentProduct, setCommentProduct] = useState("");
  const [commentDA, setCommentDA] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!ratingProduct || !ratingDA || !commentProduct.trim() || !commentDA.trim()) {
      Alert.alert("Validation", "Please provide ratings and comments for both sections.");
      return;
    }

    try {
      setSubmitting(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "Please log in to submit feedback.");
        setSubmitting(false);
        return;
      }

      const payload = {
        order_id: orderId,
        rating_product: ratingProduct,
        comment_product: commentProduct.trim(),
        rating_da: ratingDA,
        comment_da: commentDA.trim(),
      };

      const res = await fetch(`${BASE_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Thank you for your feedback!");

        // ✅ Reset form
        setRatingProduct(0);
        setRatingDA(0);
        setCommentProduct("");
        setCommentDA("");

        // ✅ Notify parent
        if (onFeedbackSubmitted) onFeedbackSubmitted(orderId);

        onClose();
      } else {
        console.error("Feedback Error:", data);
        Alert.alert("Error", data.error || "Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Feedback Submit Error:", err);
      Alert.alert("Error", "Something went wrong while submitting feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Leave Feedback</Text>

          {/* Product Rating */}
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
            placeholderTextColor="#666"
            multiline
          />

          {/* Delivery Agent Rating */}
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
            placeholderTextColor="#666"
            multiline
          />

          {/* Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.submitBtn, submitting && { opacity: 0.6 }]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              <Text style={styles.submitText}>
                {submitting ? "Submitting..." : "Submit"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                if (!submitting) onClose();
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
