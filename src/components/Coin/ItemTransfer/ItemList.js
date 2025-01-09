import { ActivityIndicator, Dimensions, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";

const ItemList = ({ isReceive, data, isLoading, navigation }) => {
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
              <Item
                key={index}
                name={item?.item?.name}
                qty={item?.qty}
                delivered_qty={item?.qty_process}
                receive_date={null}
                receive_no={null}
                unit={item?.unit?.name}
                item_id={item?.item?.item_id}
                navigation={navigation}
                isReceive={isReceive}
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
