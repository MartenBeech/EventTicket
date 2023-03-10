import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DiscoverEvents } from "./screens/DiscoverEvents";
import { MyTickets } from "./screens/MyTickets";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DiscoverEvents"
          component={DiscoverEvents}
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="MyTickets"
          component={MyTickets}
          options={{
            title: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
