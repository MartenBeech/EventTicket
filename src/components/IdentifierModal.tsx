import { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import { key_mnemonic, key_username } from "../constants";
import { createAccount, getAlgoTransaction } from "../rest/algorand";
import { getStoreValue, setStorePair } from "../store";

export const IdentifierModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    getStoreValue(key_mnemonic).then(async (mnemonic) => {
      setModalVisible(!mnemonic);
    });
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.container}>
          <Text style={styles.text}>Enter Username</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={(e) => {
              setUsername(e);
            }}
          />
          <Pressable
            style={styles.submitButton}
            onPress={async () => {
              if (username.length < 3 || username.length > 20) {
                alert("Username has to be between 3-20 characters");
              } else {
                await createAccount();
                setStorePair(key_username, username);
                getAlgoTransaction();

                setModalVisible(false);
              }
            }}
          >
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
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
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#45c458",
  },
  submitText: {},
});
