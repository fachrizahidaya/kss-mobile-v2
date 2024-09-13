import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import Item from "./Item";
import AmountList from "./AmountList";

const ItemList = ({ header, isLoading, data, currencyConverter, total }) => {
  return (
    <>
      <View style={styles.wrapper}>
        <AmountList isLoading={isLoading} total={total} />
      </View>
      <View style={{ backgroundColor: "#FFFFFF", borderRadius: 10 }}>
        <View style={styles.tableHeader}>
          {header.map((item, index) => {
            return <Text key={index}>{item.name}</Text>;
          })}
        </View>
        <View style={{ height: 300, marginHorizontal: 16 }}>
          {!isLoading ? (
            data?.length > 0 ? (
              <FlashList
                data={data}
                keyExtractor={(item, index) => index}
                onEndReachedThreshold={0.1}
                estimatedItemSize={50}
                renderItem={({ item, index }) => (
                  <Item key={index} code={item?.coa?.code} value={currencyConverter.format(item?.amount)} />
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
    </>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    gap: 10,
    paddingHorizontal: 16,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E9EB",
  },
});
