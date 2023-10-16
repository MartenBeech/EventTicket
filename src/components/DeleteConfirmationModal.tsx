import React from "react";
import { View, Text, Button, StyleSheet, Modal } from "react-native";

interface Props {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmationModal = (props: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={() => {
        props.onCancel();
      }}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>
          Are you sure you want to delete this ticket?
        </Text>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={props.onCancel} />
          <Button
            title="Confirm"
            onPress={() => {
              props.onConfirm();
              props.onCancel();
            }}
            color="red"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
