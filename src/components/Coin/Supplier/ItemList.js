import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";

const ItemList = ({ isLoading, data, isBank }) => {
  return (
    <View style={{ flex: 1, gap: 10, position: "relative" }}>
      {!isLoading ? (
        data?.length > 0 ? (
          <FlashList
            data={data}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            estimatedItemSize={50}
            renderItem={({ item, index }) => (
              <Item key={index} name={item?.name} email={item?.email} phone={item?.phone} isBank={isBank} />
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
