import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { getStoreValue } from "../store";
import { key_address, key_username } from "../constants";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export const AccountModal = (props: Props) => {
  const [username, setUsername] = useState("");
  const [addressArray, setAddressArray] = useState<string[]>([]);

  const getStoreValues = () => {
    getStoreValue(key_username).then((result) => setUsername(result));
    getStoreValue(key_address).then((result) => {
      const splitAddress = result.match(/.{1,12}/g) as string[];

      setAddressArray(splitAddress);
    });
  };

  useEffect(() => {
    getStoreValues();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
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
            <View style={styles.container}>
              <View style={styles.column}>
                <View style={styles.row}>
                  <Text style={[styles.text, styles.title]}>Username:</Text>
                  <Text style={styles.text}>{username}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.text, styles.title]}>Address:</Text>
                  <View>
                    {addressArray.map((addressSection, index) => (
                      <Text
                        key={`${addressSection}-${index}`}
                        style={styles.text}
                      >
                        {addressSection}
                      </Text>
                    ))}
                  </View>
                </View>
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
    width: "80%",
    height: "30%",
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
    gap: 20,
  },
  text: {
    fontSize: 14,
  },
  title: {
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  column: {
    gap: 20,
  },
});
