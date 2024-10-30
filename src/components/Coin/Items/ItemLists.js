import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";
import ItemUnit from "./ItemUnit";

const ItemLists = ({ data, isLoading }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <View style={{ height: screenHeight - 300 }}>
      {!isLoading ? (
        data?.length > 0 ? (
          <FlashList
            data={data}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            estimatedItemSize={50}
            renderItem={({ item, index }) => (
              <ItemUnit
                key={index}
                unit={item?.unit?.name}
                price={item?.unit_price}
                convert_amount={item?.convert_amount}
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

export default ItemLists;
