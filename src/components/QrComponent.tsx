import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface Props {
  accountAddr: string;
}

export const QrComponent = (props: Props) => {
  return (
    <View style={styles.container}>
      <QRCode value={props.accountAddr} size={200} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
