import { NavigationContainer } from "@react-navigation/native";
import { DiscoverEvents } from "./screens/discoverEvents/DiscoverEvents";
import { MyTickets } from "./screens/myTickets/MyTickets";
import { createStackNavigator } from "@react-navigation/stack";
import { Event } from "./screens/discoverEvents/Event";
import { Ticket } from "./screens/myTickets/Ticket";
import { View } from "react-native";
import { IdentifierModal } from "./components/IdentifierModal";
import { TicketEventAssetId } from "./entities/event";
import { SearchInput } from "./components/SearchInput";

export type RootStackParamList = {
  DiscoverEvents: undefined;
  MyTickets: { snackbarText: string };
  Event: { ticketEventAssetId: TicketEventAssetId };
  Ticket: { ticketEventAssetId: TicketEventAssetId };
};

const RootStack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <IdentifierModal />
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
            headerRight: () => <SearchInput />,
          }}
        />
        <RootStack.Screen
          name="MyTickets"
          component={MyTickets}
          initialParams={{ snackbarText: "" }}
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
            ticketEventAssetId: {
              ticketEvent: {
                creatorName: "",
                description: "",
                endDate: "",
                imageUrl: "",
                location: "",
                price: 0,
                startDate: "",
                title: "",
              },
              assetId: 0,
            },
          }}
          options={{
            title: "",
          }}
        />
        <RootStack.Screen
          name="Ticket"
          component={Ticket}
          initialParams={{
            ticketEventAssetId: {
              ticketEvent: {
                creatorName: "",
                description: "",
                endDate: "",
                imageUrl: "",
                location: "",
                price: 0,
                startDate: "",
                title: "",
              },
              assetId: 0,
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
