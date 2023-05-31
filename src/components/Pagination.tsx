import { StyleSheet, View, Pressable, Text } from "react-native";

interface Props {
  totalItems: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = (props: Props) => {
  const pages: number[] = [];
  const totalPages = Math.ceil(props.totalItems / 5);

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (props.currentPage <= 2) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push(totalPages);
    } else if (props.currentPage >= totalPages - 1) {
      pages.push(1);
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push(totalPages);
    }
  }

  return (
    <View style={styles.container}>
      {pages.map((page, index) => {
        return (
          <Pressable
            key={`page-${index}`}
            style={
              props.currentPage === page
                ? { ...styles.circle, ...styles.currentPageColor }
                : { ...styles.circle, ...styles.notCurrentPageColor }
            }
            onPress={() => props.setCurrentPage(page)}
          >
            <Text style={styles.text}>{page}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  circle: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 25,
    marginHorizontal: 4,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  currentPageColor: {
    backgroundColor: "#BBBBBB",
  },
  notCurrentPageColor: {
    backgroundColor: "#EEEEEE",
  },
});
