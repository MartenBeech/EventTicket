import { Snackbar as Snack } from "react-native-paper";

export type SnackbarColor = "green" | "red";

interface Props {
  textState: string;
  setTextState: React.Dispatch<React.SetStateAction<string>>;
  backgroundColor: SnackbarColor;
}

export const Snackbar = (props: Props) => {
  return (
    <Snack
      visible={!!props.textState}
      onDismiss={() => props.setTextState("")}
      style={{
        backgroundColor:
          props.backgroundColor === "green" ? "#288139" : "#d82c2c",
      }}
      wrapperStyle={{ height: 0, top: 0, zIndex: 1 }}
      duration={5000}
      action={{
        label: "Dismiss",
        onPress: () => props.setTextState(""),
      }}
    >
      {props.textState}
    </Snack>
  );
};
