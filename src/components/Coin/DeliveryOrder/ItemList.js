import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";

const ItemList = ({ header, isLoading, data, navigation }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <View style={{ height: screenHeight - 200 }}>
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
                qty={item?.qty_receive}
                unit={item?.unit?.name}
                warehouse={item?.warehouse?.name}
                item_id={item?.item_id}
                navigation={navigation}
                reference_no={item?.purchase_order?.po_no}
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

export default ItemList;
