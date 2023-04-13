import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SignedMessage } from "../entities/signedMessage";

export const QrComponent = (props: SignedMessage) => {
  const message = Array.from(props.message);
  const publicKey = props.publicKey;
  const signature = Array.from(props.signature);

  const signedMessage = {
    message,
    publicKey,
    signature,
  };
  const jsonString = JSON.stringify(signedMessage);
  console.log(jsonString);
  return (
    <View style={styles.container}>
      <QRCode value={jsonString} size={200} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
});
