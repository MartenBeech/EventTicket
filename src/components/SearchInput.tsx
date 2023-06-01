import { StyleSheet, TextInput, View } from "react-native";

interface Props {
  setState?: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchInput = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={"Search here"}
        placeholderTextColor="#888"
        onChange={(text) => {
          if (props.setState) {
            props.setState(text.nativeEvent.text);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "40%", marginHorizontal: "5%", marginVertical: 10 },
  text: {
    fontSize: 10,
  },
  input: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 5,
  },
});
