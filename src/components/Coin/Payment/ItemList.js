import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";
import AmountList from "./AmountList";

const ItemList = ({ header, isLoading, data, currencyConverter, total }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <>
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
            <EmptyPlaceholder text="No data" />
          )
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <AmountList isLoading={isLoading} total={total} />
    </>
  );
};

export default ItemList;
