import { NavigationContainer } from "@react-navigation/native";
import { DiscoverEvents } from "./screens/DiscoverEvents";
import { MyTickets } from "./screens/MyTickets";
import { createStackNavigator } from "@react-navigation/stack";
import { Event } from "./screens/Event";
import { View } from "react-native";
import { IdentifierModal } from "./components/IdentifierModal";
import { TicketEvent } from "./entities/event";

export type RootStackParamList = {
  DiscoverEvents: undefined;
  MyTickets: undefined;
  Event: { ticketEvent: TicketEvent };
};

const RootStack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <IdentifierModal></IdentifierModal>
      <RootStack.Navigator>
        <RootStack.Screen
          name="DiscoverEvents"
          component={DiscoverEvents}
          initialParams={undefined}
          options={{
            title: "",
            headerLeft: () => {
              return <View></View>;
            },
          }}
        />
        <RootStack.Screen
          name="MyTickets"
          component={MyTickets}
          initialParams={undefined}
          options={{
            title: "",
            headerLeft: () => {
              return <View></View>;
            },
          }}
        />
        <RootStack.Screen
          name="Event"
          component={Event}
          initialParams={{
            ticketEvent: {
              creatorName: "",
              description: "",
              endDate: "",
              imageCID: "",
              location: "",
              price: 0,
              startDate: "",
              title: "",
            },
          }}
          options={{
            title: "",
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
