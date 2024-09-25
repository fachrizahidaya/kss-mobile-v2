import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";

const ItemList = ({ header, isLoading, data }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <View style={styles.wrapper}>
      {/* <View style={styles.tableHeader}>
        {header.map((item, index) => {
          return <Text key={index}>{item.name}</Text>;
        })}
      </View> */}
      <View style={{ height: screenHeight - 350 }}>
        {!isLoading ? (
          data?.length > 0 ? (
            <FlashList
              data={data}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.1}
              estimatedItemSize={50}
              renderItem={({ item, index }) => (
                <Item
                  key={index}
                  name={item?.item?.name}
                  qty={item?.qty}
                  unit={item?.unit?.name}
                  warehouse={item?.warehouse?.name}
                />
              )}
            />
          ) : (
            <EmptyPlaceholder text="No data" />
          )
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E9EB",
  },
});
