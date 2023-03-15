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
type NavigationRoute = NativeStackScreenProps<RootStackParamList, "Event">;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const Event = (props: Props) => {
  const result = {
    image: require("../images/Placeholder.jpg"),
    title: "Kapsejladsen 2023: Det Officielle Afterparty!",
    startDate: "FRIDAY, APRIL 28 2023 - 6 PM",
    endDate: "SATURDAY, APRIL 29 2023 - 2 AM",
    location: "Studenterhus Aarhus",
    creator: "Mr. Studenter Hus",
    description:
      "𝐃𝐄𝐓 𝐎𝐅𝐅𝐈𝐂𝐈𝐄𝐋𝐋𝐄 𝐊𝐀𝐏𝐒𝐄𝐉𝐋𝐀𝐃𝐒 𝐀𝐅𝐓𝐄𝐑𝐏𝐀𝐑𝐓𝐘\n\nKampen om det gyldne bækken går ind den 28. april, og vi fejrer den 33. udgave af Nordeuropas største og suverænt fedeste studenterarrangement til KÆMPE afterparty i Studenterhus Aarhus!\n\nKom og fest med alle dine medstuderende, og giv den gas til livemusik på scenen og kolde, billige øl og drinks i godt vejr! Dørene åbner kl. 18.00 for alle med billet. Fra kl. 19:00 er det muligt at købe billet i døren, indtil kapaciteten er nået, så hvis du har købt en billet i forsalg, skal du sørge for at komme inden kl. 19:00.\n\nDu kan også støtte din lokale festforening ved at købe billet direkte hos dem, hvis netop din forening skal dyste til Kapsejladsen. Eventuel merchandise (hatte, trøjer etc.) gives kun ved køb igennem foreningen. Følg med på dit studie, eller tag fat i din lokale forening hvis du vil købe en billet igennem dem. Nederst kan du se en liste over de sejlende foreninger.\n\nFølg med her på eventet, hvor vi opdaterer programmet løbende.\n\nLINE-UP:\nTBA\n\n🚣 🎉 🔥 🚣 🎉 🔥 🚣 🎉 🔥 🚣 🎉 🔥",
    price: 0,
    ticketsLeft: 70,
    ticketsSold: 30,
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={result.image} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{result.title}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{result.startDate}</Text>
          <Text style={styles.info}>{result.endDate}</Text>
          <Text style={styles.info}>{result.location}</Text>
          <Text style={styles.info}>{result.creator}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{result.description}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            Price: {result.price ? `${result.price} kr.` : "Free"}
          </Text>
        </View>
        <Pressable
          style={styles.buyTicketButton}
          onPress={() => alert("Ticket Bought!")}
        >
          <Text style={styles.buyTicketText}>Buy Ticket</Text>
        </Pressable>
        <View style={styles.ticketsCounterContainer}>
          <Text style={styles.ticketsCounter}>
            {result.ticketsLeft} tickets left
          </Text>
          <Text style={styles.ticketsCounter}>
            {result.ticketsSold} tickets sold
          </Text>
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
