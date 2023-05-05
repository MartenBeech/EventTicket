import { StyleSheet, View, Image, Text } from "react-native";
import { useState, useEffect } from "react";
import { getFileFromPinata } from "../rest/ipfs";

interface Props {
  imageUrl: string;
  title: string;
  date: string;
  location: string;
}

export const EventBox = (props: Props) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    const getImage = async () => {
      const fileImage = await getFileFromPinata(props.imageUrl);
      setImage(fileImage);
    };
    getImage();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          image ? { uri: image } : require("../images/ImagePlaceholder.jpg")
        }
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
