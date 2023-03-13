import { StyleSheet, View, Image, Text } from "react-native";

interface Props {
  title: string;
  date: string;
  location: string;
}

export const EventBox = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../images/Placeholder.jpg")}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date} numberOfLines={1}>
          {props.date}
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.location} numberOfLines={1}>
          {props.location}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 250,
    width: "90%",
    marginVertical: 8,
  },
  image: {
    height: "65%",
    width: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    height: "15%",
    marginHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateContainer: {
    height: "10%",
    marginHorizontal: 10,
  },
  date: {
    fontSize: 14,
  },
  locationContainer: {
    height: "10%",
    marginHorizontal: 10,
  },
  location: {
    fontSize: 12,
    fontStyle: "italic",
  },
});
