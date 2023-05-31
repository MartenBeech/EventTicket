import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import { smartContractAccountAddr } from "../../../env";
import {
  buyAssetTransaction,
  getAssetAmountFromAccount,
  getAssetIdsFromAccount,
  getTotalFromAsset,
  optInAsset,
} from "../../rest/algorand";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getFileFromPinata } from "../../rest/ipfs";
import { Spinner } from "../../components/Spinner";
import { Snackbar, SnackbarColor } from "../../components/Snackbar";
import { getStoreValue } from "../../store";
import { key_address } from "../../constants";
type NavigationRoute = NativeStackScreenProps<RootStackParamList, "Event">;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const Event = (props: Props) => {
  const ticketEventAssetId = props.route.params.ticketEventAssetId;
  const ticketEvent = ticketEventAssetId.ticketEvent;

  const [ticketsLeft, setTicketsLeft] = useState(0);
  const [ticketsSold, setTicketsSold] = useState(0);
  const [image, setImage] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarColor, setSnackBarColor] = useState<SnackbarColor>("green");
  const [isLoading, setIsLoading] = useState(false);
  const [ticketOwned, setTicketOwned] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const handleTicketAmounts = async () => {
        setIsLoading(true);
        const totalAmount = await getTotalFromAsset(ticketEventAssetId.assetId);
        const assetAmount = await getAssetAmountFromAccount(
          smartContractAccountAddr,
          ticketEventAssetId.assetId
        );
        const fileImage = await getFileFromPinata(ticketEvent.imageUrl);

        setTicketsLeft(assetAmount);
        setTicketsSold(totalAmount - assetAmount);
        setImage(fileImage);
        setIsLoading(false);
      };
      handleTicketAmounts();

      const handleOwnedTicket = async () => {
        setIsLoading(true);
        const algorandAddress = (await getStoreValue(key_address)) as string;
        const assetIds = await getAssetIdsFromAccount(algorandAddress);
        if (assetIds.includes(props.route.params.ticketEventAssetId.assetId)) {
          setTicketOwned(true);
        }
        setIsLoading(false);
      };
      handleOwnedTicket();
    }
  }, [isFocused]);

  const buyTicket = async () => {
    setIsLoading(true);
    const optInAssetResult = await optInAsset(ticketEventAssetId.assetId);
    if (!optInAssetResult) {
      setSnackBarColor("red");
      setSnackBarText("Failed to opt in asset");
      setIsLoading(false);
      return;
    }
    const buyAssetTransactionResult = await buyAssetTransaction(
      ticketEventAssetId.assetId
    );
    if (!buyAssetTransactionResult) {
      setSnackBarColor("red");
      setSnackBarText("Failed to send ticket transaction");
      setIsLoading(false);
      return;
    }
    await new Promise((f) => setTimeout(f, 5000));
    setIsLoading(false);
    props.navigation.navigate("MyTickets", {
      snackbarText: "Successfully bought ticket",
    });
  };

  return (
    <View style={styles.screen}>
      {isLoading && <Spinner />}
      <Snackbar
        textState={snackBarText}
        setTextState={setSnackBarText}
        backgroundColor={snackBarColor}
      />
      <ScrollView>
        <Image
          style={styles.image}
          source={
            image
              ? { uri: image }
              : require("../../images/ImagePlaceholder.jpg")
          }
        />
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{ticketEvent.title}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{ticketEvent.startDate}</Text>
            <Text style={styles.info}>{ticketEvent.endDate}</Text>
            <Text style={styles.info}>{ticketEvent.location}</Text>
            <Text style={styles.info}>{ticketEvent.creatorName}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{ticketEvent.description}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              Price: {ticketEvent.price ? `${ticketEvent.price} kr.` : "Free"}
            </Text>
          </View>
          {ticketOwned ? (
            <Pressable
              style={{ ...styles.buyTicketButton, ...styles.ticketBoughtColor }}
            >
              <Text style={styles.buyTicketText}>Ticket Bought</Text>
            </Pressable>
          ) : (
            <Pressable
              style={{ ...styles.buyTicketButton, ...styles.buyTicketColor }}
              onPress={buyTicket}
            >
              <Text style={styles.buyTicketText}>Buy Ticket</Text>
            </Pressable>
          )}
          <View style={styles.ticketsCounterContainer}>
            <Text style={styles.ticketsCounter}>
              {ticketsLeft} tickets left
            </Text>
            <Text style={styles.ticketsCounter}>
              {ticketsSold} tickets sold
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    minHeight: "100%",
  },
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  buyTicketColor: {
    backgroundColor: "#5955FF",
  },
  ticketBoughtColor: {
    backgroundColor: "#0D8200",
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
