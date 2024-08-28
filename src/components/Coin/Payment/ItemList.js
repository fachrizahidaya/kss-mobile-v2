import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import Item from "./Item";
import AmountList from "./AmountList";

const ItemList = ({ header, isLoading, data, currencyConverter, total }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <>
      <View style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: 5 }}>
        <View style={styles.tableHeader}>
          {header.map((item, index) => {
            return <Text key={index}>{item.name}</Text>;
          })}
        </View>
        <View style={{ height: screenHeight - 400 }}>
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
                    code={item?.coa?.code}
                    name={item?.coa?.name}
                    value={currencyConverter.format(item?.amount)}
                  />
                )}
              />
            ) : (
              <EmptyPlaceholder height={200} width={240} text="No data" />
            )
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </View>
      <View style={styles.wrapper}>
        <AmountList isLoading={isLoading} total={total} />
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
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E9EB",
  },
});
