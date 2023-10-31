import { StyleSheet, Pressable, Image } from "react-native";

interface Props {
  onPress: () => void;
}

export const AccountButton = (props: Props) => {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <Image style={styles.image} source={require("../images/Profile.png")} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 18,
  },
  image: {
    width: 30,
    height: 30,
  },
});
