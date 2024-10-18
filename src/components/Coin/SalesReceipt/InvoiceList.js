import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";
import Amount from "./Amount";

const InvoiceList = ({ isLoading, payment, paid, discount, over, data, currencyConverter, navigation }) => {
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
                    total_amount={item?.total_amount}
                    currencyConverter={currencyConverter}
                    invoice_id={item?.sales_invoice?.id}
                    invoice_no={item?.sales_invoice?.invoice_no}
                    debt={item?.debt_amount}
                    payment={item?.payment_amount}
                    discount={item?.discount_amount}
                    total={item?.total_payment}
                    navigation={navigation}
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
        <Amount payment={payment} paid={paid} discount={discount} over={over} isLoading={isLoading} />
      </View>
    </>
  );
};

export default InvoiceList;

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
