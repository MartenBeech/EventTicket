import { StyleSheet, View, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation";
import { NavigationBar } from "../NavigationBar";
import { EventBox } from "../components/EventBox";
type NavigationRoute = NativeStackScreenProps<
  RootStackParamList,
  "DiscoverEvents"
>;

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const DiscoverEvents = (props: Props) => {
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <EventBox
            title="Kapsejladsen 2023: Det Officielle Afterparty!"
            date="FRIDAY, APRIL 28 2023 - 6 PM"
            location="Studenterhus Aarhus"
          />
          <EventBox
            title="Stella Polaris Aarhus"
            date="SATURDAY, JULY 29 2023 - 12 PM"
            location="Vennelystparken"
          />
          <EventBox
            title="Brazil Beats - Spring Party - Dj Roni"
            date="FRIDAY, APRIL 21 2023 - 10 PM"
            location="CasaV58"
          />
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
});
