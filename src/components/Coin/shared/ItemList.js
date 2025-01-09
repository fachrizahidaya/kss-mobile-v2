import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import AmountList from "../SalesOrder/AmountList";
import ItemQuotation from "../Quotation/ItemQuotation";

const ItemList = ({
  isLoading,
  data,
  currencyConverter,
  discount,
  tax,
  sub_total,
  total_amount,
  navigation,
  dynamicPadding,
  handleDynamicPadding,
}) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <View style={{ height: screenHeight - 240, gap: 10, position: "relative" }}>
      {!isLoading ? (
        data?.length > 0 ? (
          <FlashList
            contentContainerStyle={{ paddingBottom: dynamicPadding }}
            data={data}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            estimatedItemSize={50}
            renderItem={({ item, index }) => (
              <ItemQuotation
                key={index}
                name={item?.item?.name}
                qty={item?.qty}
                unit={item?.unit?.name}
                total_amount={item?.total_amount}
                currencyConverter={currencyConverter}
                item_id={item?.item_id}
                navigation={navigation}
                unit_price={item?.unit_price}
                discount={item?.discount_amount}
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
      <AmountList
        isLoading={isLoading}
        discount={discount}
        tax={tax}
        sub_total={sub_total}
        total_amount={total_amount}
        handleDynamicPadding={handleDynamicPadding}
      />
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  tableContent: {
    gap: 10,
    position: "relative",
  },
});
