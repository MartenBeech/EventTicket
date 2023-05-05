import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import { NavigationBar } from "../../NavigationBar";
import { EventBox } from "../../components/EventBox";
import { getAssetIdsFromAccount, getUrlFromAssetId } from "../../rest/algorand";
import { smartContractAccountAddr } from "../../../env";
import { useEffect, useState } from "react";
import { getIPFSEventData } from "../../rest/ipfs";
import { TicketEventAssetId } from "../../entities/event";
type NavigationRoute = NativeStackScreenProps<
  RootStackParamList,
  "DiscoverEvents"
>;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const DiscoverEvents = (props: Props) => {
  const [events, setEvents] = useState<TicketEventAssetId[]>([]);

  useEffect(() => {
    const getAssetUrlsFromAccount = async () => {
      const assetIds = await getAssetIdsFromAccount(smartContractAccountAddr);
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
    };
    getAssetUrlsFromAccount();
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          {events.map((event, index) => {
            const ticketEvent = event.ticketEvent;
            return (
              <Pressable
                key={`${ticketEvent.title}-${index}`}
                style={styles.button}
                onPress={() => {
                  props.navigation.navigate("Event", {
                    ticketEventAssetId: { ticketEvent, assetId: event.assetId },
                  });
                }}
              >
                <EventBox
                  imageUrl={ticketEvent.imageUrl}
                  title={ticketEvent.title}
                  date={ticketEvent.startDate}
                  location={ticketEvent.location}
                />
              </Pressable>
            );
          })}
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
});
