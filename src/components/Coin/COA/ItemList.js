import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";

const ItemList = ({ header, isLoading, data, currencyConverter }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <>
      <View style={{ height: screenHeight - 300 }}>
        {!isLoading ? (
          data?.length > 0 ? (
            <FlashList
              data={data}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.1}
              estimatedItemSize={50}
              renderItem={({ item, index }) => (
                <Item
                  name={item?.name}
                  code={item?.code}
                  balance={currencyConverter.format(item?.balance)}
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
