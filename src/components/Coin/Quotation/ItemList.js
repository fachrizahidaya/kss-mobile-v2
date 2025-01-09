import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import AmountList from "../shared/AmountList";
import ItemQuotation from "./ItemQuotation";

const ItemList = ({ isLoading, data, currencyConverter, discount, tax, sub_total, total_amount, navigation }) => {
  return (
    <>
      <View style={{ height: screenHeight - 450 }}>
        {!isLoading ? (
          data?.length > 0 ? (
            <FlashList
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
      </View>
      <AmountList
        isLoading={isLoading}
        discount={discount}
        tax={tax}
        sub_total={sub_total}
        total_amount={total_amount}
      />
    </>
  );
};

export default ItemList;
