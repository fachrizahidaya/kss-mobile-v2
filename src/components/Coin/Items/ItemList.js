import { FlashList } from "@shopify/flash-list";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import ItemsListItem from "./ItemsListItem";

const height = Dimensions.get("screen").height - 300;

const ItemList = ({
  data,
  isFetching,
  isLoading,
  refetch,
  fetchMore,
  filteredData,
  hasBeenScrolled,
  setHasBeenScrolled,
  navigation,
}) => {
  return (
    <View style={styles.wrapper}>
      {data?.length || filteredData?.length > 0 ? (
        <FlashList
          data={data.length ? data : filteredData}
          onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          onEndReached={hasBeenScrolled ? fetchMore : null}
          ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          estimatedItemSize={70}
          renderItem={({ item, index }) => (
            <ItemsListItem
              key={index}
              id={item?.id}
              name={item?.name}
              qty={item?.total_stock?.total ? item?.total_stock?.total : 0}
              available_qty={item?.on_hand_stock?.total ? item?.on_hand_stock?.total : 0}
              code={item?.sku}
              index={index}
              length={data?.length ? data?.length : filteredData?.length}
              navigation={navigation}
              category={item?.item_category?.name}
              unit={item?.item_unit_stock?.unit?.name}
            />
          )}
        />
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <View style={styles.content}>
            <EmptyPlaceholder text="No data" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
