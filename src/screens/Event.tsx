import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation";
import { useEffect, useState } from "react";
import { IPFSUrlPrefix } from "../../env";
type NavigationRoute = NativeStackScreenProps<RootStackParamList, "Event">;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

interface Event {
  location: string;
  title: string;
  startDate: string;
  endDate: string;
  imageCID: string;
  description: string;
  price: number;
  creatorName: string;
}

export const Event = (props: Props) => {
  const [eventState, setEventState] = useState<Event>();

  useEffect(() => {
    const getIPFS = async () => {
      const response = await window.fetch(
        `${IPFSUrlPrefix}/QmP2YiCo1mag5z6tZez1Cu4YcuvSfJdgF6huv3euq5seWb`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      setEventState(json);
    };
    getIPFS();
  }, []);

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: `${IPFSUrlPrefix}/${eventState?.imageCID}` }}
      />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{eventState?.title}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{eventState?.startDate}</Text>
          <Text style={styles.info}>{eventState?.endDate}</Text>
          <Text style={styles.info}>{eventState?.location}</Text>
          <Text style={styles.info}>{eventState?.creatorName}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{eventState?.description}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            Price: {eventState?.price ? `${eventState?.price} kr.` : "Free"}
          </Text>
        </View>
        <Pressable
          style={styles.buyTicketButton}
          onPress={() => alert("Ticket Bought!")}
        >
          <Text style={styles.buyTicketText}>Buy Ticket</Text>
        </Pressable>
        <View style={styles.ticketsCounterContainer}>
          <Text style={styles.ticketsCounter}>70 tickets left</Text>
          <Text style={styles.ticketsCounter}>30 tickets sold</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    marginHorizontal: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    marginBottom: 16,
  },
  info: {
    fontSize: 14,
    fontStyle: "italic",
  },
  descriptionContainer: {
    marginBottom: 32,
  },
  description: {
    fontSize: 12,
  },
  priceContainer: {
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
  },
  buyTicketButton: {
    height: 50,
    width: "100%",
    backgroundColor: "#5955FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  buyTicketText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  ticketsCounterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  ticketsCounter: {
    fontSize: 12,
    fontStyle: "italic",
  },
});
