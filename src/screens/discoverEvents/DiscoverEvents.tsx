import { StyleSheet, View, ScrollView, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import { NavigationBar } from "../../NavigationBar";
import { getAssetIdsFromAccount, getUrlFromAssetId } from "../../rest/algorand";
import { smartContractAccountAddr } from "../../../env";
import { useEffect, useState } from "react";
import { getIPFSEventData } from "../../rest/ipfs";
import { TicketEventAssetId } from "../../entities/event";
import { useIsFocused } from "@react-navigation/native";
import { Spinner } from "../../components/Spinner";
import { Pagination } from "../../components/Pagination";
import {
  convertDateMonthYearToUTC,
  isDateAfterNow,
} from "../../services/dateTime";
import { filterItemsForPage } from "../../services/filterItemsForPage";
import { SearchInput } from "../../components/SearchInput";
import { useDebouncedCallback } from "use-debounce";
import { EventCard } from "../../components/EventCard";
type NavigationRoute = NativeStackScreenProps<
  RootStackParamList,
  "DiscoverEvents"
>;

export interface Filter {
  currentPage: number;
  searchString: string;
}

interface Props {
  navigation: NavigationRoute["navigation"];
  route: NavigationRoute["route"];
}

export const DiscoverEvents = (props: Props) => {
  const [events, setEvents] = useState<TicketEventAssetId[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    currentPage: 1,
    searchString: "",
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const getAssetUrlsFromAccount = async () => {
        setIsLoading(true);
        setEvents([]);
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
        const searchFilteredEvents = filters.searchString
          ? events.filter(
              (event) =>
                event.ticketEvent.title
                  .toLocaleLowerCase()
                  .includes(filters.searchString.toLocaleLowerCase()) ||
                event.ticketEvent.creatorName
                  .toLocaleLowerCase()
                  .includes(filters.searchString.toLocaleLowerCase()) ||
                event.ticketEvent.location
                  .toLocaleLowerCase()
                  .includes(filters.searchString.toLocaleLowerCase()) ||
                event.ticketEvent.description
                  .toLocaleLowerCase()
                  .includes(filters.searchString.toLocaleLowerCase())
            )
          : events;
        const activeEvents = searchFilteredEvents.filter((event) =>
          isDateAfterNow(event.ticketEvent.endDate)
        );
        setTotalEvents(activeEvents.length);
        const sortedEvents = activeEvents.sort((a, b) => {
          return convertDateMonthYearToUTC(a.ticketEvent.startDate) >
            convertDateMonthYearToUTC(b.ticketEvent.startDate)
            ? 1
            : -1;
        });
        const pageFilteredEvents = filterItemsForPage({
          items: sortedEvents,
          currentPage: filters.currentPage,
        });
        setEvents(pageFilteredEvents);
        setIsLoading(false);
      };
      getAssetUrlsFromAccount();
    }
  }, [isFocused, filters]);

  const debouncedSetSearchString = useDebouncedCallback((value) => {
    setFilters({ currentPage: 1, searchString: value });
  }, 500);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <SearchInput setState={debouncedSetSearchString} />,
    });
  }, [props.navigation]);

  return (
    <View style={styles.screen}>
      {isLoading && <Spinner />}
      {!events.length && !isLoading && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>There are no events to discover</Text>
        </View>
      )}
      <ScrollView>
        <View style={styles.container}>
          {events.map((event, index) => (
            <EventCard
              event={event.ticketEvent}
              key={`EventCard-${index}`}
              onPress={() => {
                props.navigation.navigate("Event", {
                  ticketEventAssetId: {
                    ticketEvent: event.ticketEvent,
                    assetId: event.assetId,
                  },
                });
              }}
            />
          ))}
          {!!events.length && (
            <Pagination
              totalItems={totalEvents}
              filter={filters}
              setFilter={setFilters}
            />
          )}
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
