import { ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";

export const Spinner = () => {
  return (
    <ActivityIndicator animating={true} style={styles.spinner} size={70} />
  );
};

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
