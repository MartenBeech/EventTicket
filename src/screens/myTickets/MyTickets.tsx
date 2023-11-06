import { StyleSheet, View, ScrollView, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import { NavigationBar } from "../../NavigationBar";
import { getAssetIdsFromAccount, getUrlFromAssetId } from "../../rest/algorand";
import { useEffect, useState } from "react";
import { getIPFSEventData } from "../../rest/ipfs";
import { TicketEventAssetId } from "../../entities/event";
import { getStoreValue } from "../../store";
import { key_address } from "../../constants";
import { useIsFocused } from "@react-navigation/native";
import { Spinner } from "../../components/Spinner";
import { Snackbar } from "../../components/Snackbar";
import { EventCard } from "../../components/EventCard";
type NavigationRoute = NativeStackScreenProps<RootStackParamList, "MyTickets">;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const MyTickets = (props: Props) => {
  const [events, setEvents] = useState<TicketEventAssetId[]>([]);
  const [snackBarText, setSnackBarText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setSnackBarText(props.route.params.snackbarText);
      const getMyAssets = async () => {
        setIsLoading(true);
        const algorandAddress = (await getStoreValue(key_address)) as string;
        const assetIds = await getAssetIdsFromAccount(algorandAddress);
        const assets = await Promise.all(
          assetIds.map(async (assetId) => {
            return { url: await getUrlFromAssetId(assetId), id: assetId };
          })
        );
        const events = await Promise.all(
          assets.map(async (asset) => {
            return {
              ticketEvent: await getIPFSEventData(asset.url),
              assetId: asset.id,
            };
          })
        );
        setEvents(events);
        setIsLoading(false);
      };
      getMyAssets();
    }
  }, [isFocused]);

  return (
    <View style={styles.screen}>
      {isLoading && <Spinner />}
      <Snackbar
        textState={snackBarText}
        setTextState={setSnackBarText}
        backgroundColor={"green"}
      />
      {!events.length && !isLoading && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>You have no active events</Text>
        </View>
      )}
      <ScrollView>
        <View style={styles.container}>
          {events.map((event, index) => (
            <EventCard
              event={event.ticketEvent}
              key={`EventCard-${index}`}
              onPress={() => {
                props.navigation.navigate("Ticket", {
                  ticketEventAssetId: {
                    ticketEvent: event.ticketEvent,
                    assetId: event.assetId,
                  },
                });
              }}
            />
          ))}
        </View>
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
  button: {
    width: "100%",
    alignItems: "center",
  },
  textContainer: {
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
});
