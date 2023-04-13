import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { QrComponent } from "./QrComponent";
import { getStoreValue } from "../store";
import { key_address } from "../constants";
import { useEffect, useState } from "react";

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VerifyTicket = (props: Props) => {
  const [keyAddress, setKeyAddress] = useState("");
  useEffect(() => {
    const getKeyAddress = async () => {
      const keyAddress = (await getStoreValue(key_address)) as string;
      setKeyAddress(keyAddress);
    };
    getKeyAddress();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}
    >
      <TouchableOpacity
        style={styles.screen}
        activeOpacity={1}
        onPressOut={() => {
          props.setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View>
              {keyAddress && <QrComponent accountAddr={keyAddress} />}
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "50%",
    height: "30%",
    margin: 20,
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
  text: {
    fontSize: 12,
  },
  textInput: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  submitButton: {
    borderWidth: 1,
    borderRadius: 15,
    width: "50%",
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#45c458",
  },
  submitText: {},
});
