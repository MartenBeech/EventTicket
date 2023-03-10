import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import { RootStackParamList } from "./Navigation";

interface Props {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >;
}

export const NavigationBar = (props: Props) => {
  const route = useRoute();
  console.log(route);
  return (
    <View style={styles.container}>
      <Pressable
        style={{ ...styles.button, ...styles.buttonRightBorder }}
        onPress={() => {
          props.navigation.navigate("DiscoverEvents");
        }}
      >
        <Text style={styles.text}>Discover Events</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          props.navigation.navigate("MyTickets");
        }}
      >
        <Text style={styles.text}>My Tickets</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
  },
  button: {
    width: "50%",
    backgroundColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRightBorder: {
    borderRightWidth: 1,
    borderRightColor: "#FFFFFF",
  },
  text: {
    color: "#FFFFFF",
  },
});
