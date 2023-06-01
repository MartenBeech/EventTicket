import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import { Filter } from "../screens/discoverEvents/DiscoverEvents";

interface Props {
  totalItems: number;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

export const Pagination = (props: Props) => {
  const pages: number[] = [];
  const totalPages = Math.ceil(props.totalItems / 5);

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (props.filter.currentPage <= 2) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push(totalPages);
    } else if (props.filter.currentPage >= totalPages - 1) {
      pages.push(1);
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      for (
        let i = props.filter.currentPage - 1;
        i <= props.filter.currentPage + 1;
        i++
      ) {
        pages.push(i);
      }
      pages.push(totalPages);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={
          props.filter.currentPage === 1
            ? { ...styles.circle, ...styles.currentPageColor }
            : { ...styles.circle, ...styles.notCurrentPageColor }
        }
        onPress={() => {
          if (props.filter.currentPage != 1) {
            props.setFilter({
              currentPage: props.filter.currentPage - 1,
              searchString: props.filter.searchString,
            });
          }
        }}
      >
        <Image
          style={styles.image}
          source={require("../images/ChevronLeft.png")}
        />
      </Pressable>
      {pages.map((page, index) => {
        return (
          <Pressable
            key={`page-${index}`}
            style={
              props.filter.currentPage === page
                ? { ...styles.circle, ...styles.currentPageColor }
                : { ...styles.circle, ...styles.notCurrentPageColor }
            }
            onPress={() =>
              props.setFilter({
                currentPage: page,
                searchString: props.filter.searchString,
              })
            }
          >
            <Text style={styles.text}>{page}</Text>
          </Pressable>
        );
      })}
      <Pressable
        style={
          props.filter.currentPage === totalPages
            ? { ...styles.circle, ...styles.currentPageColor }
            : { ...styles.circle, ...styles.notCurrentPageColor }
        }
        onPress={() => {
          if (props.filter.currentPage != totalPages) {
            props.setFilter({
              currentPage: props.filter.currentPage + 1,
              searchString: props.filter.searchString,
            });
          }
        }}
      >
        <Image
          style={styles.image}
          source={require("../images/ChevronRight.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  circle: {
    height: 42,
    width: 42,
    borderWidth: 1,
    borderRadius: 21,
    marginHorizontal: 4,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
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
