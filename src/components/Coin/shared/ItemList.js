import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import Item from "./Item";
import AmountList from "../shared/AmountList";

const ItemList = ({ isLoading, data, currencyConverter, discount, tax, sub_total, total_amount }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <>
      <View style={styles.wrapper}>
        <View style={{ height: screenHeight - 500 }}>
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
                    total_amount={item?.total_amount}
                    currencyConverter={currencyConverter}
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
      <View>
        <AmountList
          isLoading={isLoading}
          discount={discount}
          tax={tax}
          sub_total={sub_total}
          total_amount={total_amount}
        />
      </View>
    </>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E9EB",
  },
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
