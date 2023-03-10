import { Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation";
import { NavigationBar } from "../NavigationBar";
type NavigationRoute = NativeStackScreenProps<
  RootStackParamList,
  "DiscoverEvents"
>;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const DiscoverEvents = (props: Props) => {
  return (
    <View>
      <Text>Discover Events</Text>
      <NavigationBar navigation={props.navigation} />
    </View>
  );
};
