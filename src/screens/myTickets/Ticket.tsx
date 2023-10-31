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
  getAssetAmountFromAccount,
  getAssetIdsFromAccount,
  getTotalFromAsset,
  optOutOfAsset,
} from "../../rest/algorand";
import { useEffect, useState } from "react";
import { VerifyTicketModal } from "../../components/VerifyTicketModal";
import { useIsFocused } from "@react-navigation/native";
import { getFileFromPinata } from "../../rest/ipfs";
import { Modal } from "react-native-paper";
import { DeleteConfirmationModal } from "../../components/DeleteConfirmationModal";
import { SnackbarColor } from "../../components/Snackbar";
import { Spinner } from "../../components/Spinner";
import { getStoreValue } from "../../store";
import { key_address } from "../../constants";
type NavigationRoute = NativeStackScreenProps<RootStackParamList, "Ticket">;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const Ticket = (props: Props) => {
  const [ticketsLeft, setTicketsLeft] = useState(0);
  const [ticketsSold, setTicketsSold] = useState(0);
  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [image, setImage] = useState("");
  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarColor, setSnackBarColor] = useState<SnackbarColor>("green");
  const [isLoading, setIsLoading] = useState(false);

  const ticketEventAssetId = props.route.params.ticketEventAssetId;
  const ticketEvent = ticketEventAssetId.ticketEvent;

  const isFocused = useIsFocused();

  const deleteTicket = async () => {
    setIsLoading(true);
    const optInAssetResult = await optOutOfAsset(ticketEventAssetId.assetId);
    if (!optInAssetResult) {
      setSnackBarColor("red");
      setSnackBarText("Failed to opt in asset");
      setIsLoading(false);
      return;
    }

    const algorandAddress = (await getStoreValue(key_address)) as string;
    let assetReceivedCount = 0;
    do {
      const assetIds = await getAssetIdsFromAccount(algorandAddress);
      await new Promise((f) => setTimeout(f, 1000));
      assetReceivedCount++;
      console.log(assetReceivedCount);
      // We need to check that we don't have it anymore
      if (!assetIds.includes(ticketEventAssetId.assetId)) {
        assetReceivedCount = 10;
      }
    } while (assetReceivedCount < 10);

    setIsLoading(false);
    props.navigation.navigate("MyTickets", {
      snackbarText: "Successfully Delete Ticket",
    });
  };

  useEffect(() => {
    if (isFocused) {
      const getTicketAmounts = async () => {
        const totalAmount = await getTotalFromAsset(ticketEventAssetId.assetId);
        const assetAmount = await getAssetAmountFromAccount(
          smartContractAccountAddr,
          ticketEventAssetId.assetId
        );
        const fileImage = await getFileFromPinata(ticketEvent.imageUrl);

        setTicketsLeft(assetAmount);
        setTicketsSold(totalAmount - assetAmount);
        setImage(fileImage);
      };
      getTicketAmounts();
    }
  }, [isFocused]);

  return (
    <View style={styles.screen}>
      {isLoading && <Spinner />}
      <ScrollView>
        {verifyModalVisible && (
          <VerifyTicketModal onClose={() => setVerifyModalVisible(false)} />
        )}

        <Image
          style={styles.image}
          source={
            image
              ? { uri: image }
              : require("../../images/ImagePlaceholder.jpg")
          }
        />
        <DeleteConfirmationModal
          isVisible={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={async () => await deleteTicket()}
        ></DeleteConfirmationModal>
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
          <Pressable
            style={[styles.verifyTicketButton, styles.buttonStyling]}
            onPress={async () => {
              setVerifyModalVisible(true);
            }}
          >
            <Text style={styles.buyTicketText}>Verify Ticket</Text>
          </Pressable>
          <View style={styles.ticketsCounterContainer}>
            <Text style={styles.ticketsCounter}>
              {ticketsLeft} tickets left
            </Text>
            <Text style={styles.ticketsCounter}>
              {ticketsSold} tickets sold
            </Text>
          </View>
          <Pressable
            style={[styles.deleteTicketButton, styles.buttonStyling]}
            onPress={async () => {
              setDeleteModalVisible(true);
            }}
          >
            <Text style={styles.buyTicketText}>Delete Ticket</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    minWidth: "100%",
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
  verifyTicketButton: {
    backgroundColor: "#0D8200",
  },
  deleteTicketButton: {
    backgroundColor: "#F91130",
  },
  buttonStyling: {
    height: 50,
    width: "100%",
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
