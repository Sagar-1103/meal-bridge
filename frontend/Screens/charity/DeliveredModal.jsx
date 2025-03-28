import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../context/AuthProvider";
import { BACKEND_URL } from "../../constants/Environments";
import axios from "axios";

const DeliveredModal = ({ visible, onClose,listID }) => {
  const {user} = useAuth();
  
  const setDelivered = async()=>{
    try {
        const url = `${BACKEND_URL}/status/delivered`;
        const response = await axios.patch(url,{listID,charityID:user.charityID},{
            headers:{
                "Content-Type": "application/json"
            }
        });
        const res = await response.data;
        console.log(res);
    } catch (error) {
        console.log(error);
    }
  }

  const handleClose = ()=>{
    setDelivered();
    onClose();
  }
  return (
    <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Ionicons name="checkmark-circle" size={60} color="#FF6B00" />
          <Text style={styles.modalTitle}>Has it been delivered?</Text>
          <TouchableOpacity onPress={handleClose} style={styles.deliveredButton}>
            <Text style={styles.buttonText}>Delivered</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 15,
  },
  deliveredButton: {
    backgroundColor: "#FF6B00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DeliveredModal;
