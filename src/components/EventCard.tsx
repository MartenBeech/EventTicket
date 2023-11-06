import { Pressable, StyleSheet } from "react-native";
import { TicketEvent } from "../entities/event";
import { EventBox } from "./EventBox";

interface Props {
  event: TicketEvent;
  onPress?: () => void;
}

export const EventCard = (props: Props) => {
  const ticketEvent = props.event;
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <EventBox
        imageUrl={ticketEvent.imageUrl}
        title={ticketEvent.title}
        date={ticketEvent.startDate}
        location={ticketEvent.location}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
  },
});
