import { NavigationContainer } from "@react-navigation/native";
import { DiscoverEvents } from "./screens/DiscoverEvents";
import { MyTickets } from "./screens/MyTickets";
import { createStackNavigator } from "@react-navigation/stack";
import { Event } from "./screens/Event";

export type RootStackParamList = {
  DiscoverEvents: undefined;
  MyTickets: undefined;
  Event: { id: number };
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
        <RootStack.Screen
          name="Event"
          component={Event}
          initialParams={{ id: 0 }}
          options={{
            title: "",
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
