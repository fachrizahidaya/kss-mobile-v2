import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";
import AmountList from "./AmountList";

const ItemList = ({ header, isLoading, data, currencyConverter, debit, credit }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <>
      <View style={{ flex: 1 }}>
        {!isLoading ? (
          data?.length > 0 ? (
            <FlashList
              data={data}
              scrollEnabled={false}
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
    </>
  );
};

export default ItemList;
