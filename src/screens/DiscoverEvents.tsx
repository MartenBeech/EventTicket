import { StyleSheet, View, ScrollView, Pressable, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation";
import { NavigationBar } from "../NavigationBar";
import { EventBox } from "../components/EventBox";
import { getAssetIdsFromAccount, getUrlFromAsset } from "../rest/algorand";
import { smartContractAccountAddr } from "../../env";
import { useEffect, useState } from "react";
import { getIPFSEventData } from "../rest/ipfs";
import { TicketEvent } from "../entities/event";
type NavigationRoute = NativeStackScreenProps<
  RootStackParamList,
  "DiscoverEvents"
>;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const DiscoverEvents = (props: Props) => {
  const [events, setEvents] = useState<TicketEvent[]>([]);

  useEffect(() => {
    console.log("Hejsa frede");
    const getAssetUrlsFromAccount = async () => {
      const assetIds = await getAssetIdsFromAccount(smartContractAccountAddr);
      const urls = await Promise.all(
        assetIds.map((assetId) => {
          return getUrlFromAsset(assetId);
        })
      );
      const fakeUrls = [
        "QmP2YiCo1mag5z6tZez1Cu4YcuvSfJdgF6huv3euq5seWb", //Hardcoded
        ...urls,
      ];
      const events = await Promise.all(
        fakeUrls.map((url) => {
          return getIPFSEventData(url);
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
          {events.map((ticketEvent, index) => (
            <Pressable
              key={`${ticketEvent.title}-${index}`}
              style={styles.button}
              onPress={() => {
                props.navigation.navigate("Event", { ticketEvent });
              }}
            >
              <EventBox
                url={ticketEvent.imageCID}
                title={ticketEvent.title}
                date={ticketEvent.startDate}
                location={ticketEvent.location}
              />
            </Pressable>
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
});
