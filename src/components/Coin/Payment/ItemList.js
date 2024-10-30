import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";
import AmountList from "./AmountList";

const ItemList = ({ header, isLoading, data, currencyConverter, total, handleDynamicPadding, dynamicPadding }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <>
      <View style={{ height: screenHeight - 240 }}>
        {!isLoading ? (
          data?.length > 0 ? (
            <FlashList
              contentContainerStyle={{ paddingBottom: dynamicPadding }}
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
        <AmountList isLoading={isLoading} total={total} handleDynamicPadding={handleDynamicPadding} />
      </View>
    </>
  );
};

export default ItemList;
