import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";
import AmountList from "./AmountList";

const ItemList = ({ header, isLoading, data, currencyConverter, debit, credit }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <>
      <View style={styles.wrapper}>
        {/* <View style={styles.tableHeader}>
          {header.map((item, index) => {
            return <Text key={index}>{item.name}</Text>;
          })}
        </View> */}
        <View style={{ height: screenHeight - 450 }}>
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
                    name={item?.coa?.name}
                    currencyConverter={currencyConverter}
                    debit={item?.debt_amount}
                    credit={item?.credit_amount}
                    code={item?.coa?.code}
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
      <AmountList isLoading={isLoading} debit={debit} credit={credit} />
    </>
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
