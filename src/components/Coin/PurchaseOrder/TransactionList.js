import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";

const TransactionList = ({ header, data, isLoading, isInvoice }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <View style={{ height: screenHeight - 420 }}>
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
                code={isInvoice ? item?.purchase_payment?.payment_no : item?.receive_purchase_order?.receive_no}
                date={
                  isInvoice
                    ? dayjs(item?.purchase_payment?.payment_date).format("DD/MM/YYYY")
                    : dayjs(item?.receive_purchase_order?.receive_date).format("DD/MM/YYYY")
                }
                amount={item?.total_payment}
                isInvoice={isInvoice}
                index={index}
                length={data?.length}
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
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
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
