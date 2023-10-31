import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import {
  blue100,
  red100,
} from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";

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
      <TouchableOpacity
        style={styles.screen}
        activeOpacity={1}
        onPressOut={() => {
          props.onCancel();
        }}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this ticket?
              </Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.buttonStyling, styles.cancelButton]}
                  onPress={props.onCancel}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttonStyling, styles.confirmButton]}
                  onPress={props.onConfirm}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: "25%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 40,
  },
  cancelButton: {
    backgroundColor: "#F91130",
  },
  confirmButton: {
    backgroundColor: "#0D8200",
  },
  buttonStyling: {
    height: 50,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});
