import { Text, View } from "react-native";
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
    <View>
      <Text>My Tickets</Text>
      <NavigationBar navigation={props.navigation} />
    </View>
  );
};
