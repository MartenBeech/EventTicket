import { StyleSheet, View, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation";
import { NavigationBar } from "../NavigationBar";
type NavigationRoute = NativeStackScreenProps<RootStackParamList, "MyTickets">;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const MyTickets = (props: Props) => {
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.container}></View>
      </ScrollView>
      <NavigationBar navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: "100%",
  },
  container: {
    height: "90%",
    alignItems: "center",
  },
});
