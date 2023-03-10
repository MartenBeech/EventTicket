import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationBar } from "./NavigationBar";
import { DiscoverEvents } from "./screens/DiscoverEvents";
import { MyTickets } from "./screens/MyTickets";
import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  DiscoverEvents: undefined;
  MyTickets: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="DiscoverEvents"
          component={DiscoverEvents}
          initialParams={undefined}
          options={{
            title: "",
          }}
        />
        <RootStack.Screen
          name="MyTickets"
          component={MyTickets}
          initialParams={undefined}
          options={{
            title: "",
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
