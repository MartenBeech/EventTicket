import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { QrComponent } from "./QrComponent";
import { getStoreValue } from "../store";
import { key_address, key_mnemonic } from "../constants";
import { useEffect, useState } from "react";
import { signMessage } from "../algorand/messageHandler";
import { SignedMessage } from "../entities/signedMessage";

interface Props {
  onClose: () => void;
}

export const VerifyTicketModal = (props: Props) => {
  const [signedMessage, setSignedMessage] = useState<SignedMessage>({
    message: new Uint8Array(),
    publicKey: "",
    signature: new Uint8Array(),
  });
  useEffect(() => {
    const getKeyAddress = async () => {
      const keyAddress = await getStoreValue(key_address);
      const mnemonic = await getStoreValue(key_mnemonic);
      const signedMessage = signMessage({
        publicKey: keyAddress,
        mnemonic: mnemonic,
      });
      setSignedMessage(signedMessage);
    };
    getKeyAddress();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.onClose();
      }}
    >
      <TouchableOpacity
        style={styles.screen}
        activeOpacity={1}
        onPressOut={() => {
          props.onClose();
        }}
      >
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View>
              {signedMessage.publicKey && <QrComponent {...signedMessage} />}
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
