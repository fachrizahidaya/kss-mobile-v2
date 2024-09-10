import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import ItemWarehouseListItem from "./ItemWarehouseListItem";

const height = Dimensions.get("screen").height - 300;

const ItemWarehouseList = ({
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
          //   onEndReached={hasBeenScrolled ? fetchMore : null}
          //   ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
          refreshing={true}
          //   refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          estimatedItemSize={70}
          renderItem={({ item, index }) => (
            <ItemWarehouseListItem
              name={item?.name}
              qty={item?.qty}
              code={item?.code}
              index={index}
              length={data?.length ? data?.length : filteredData?.length}
            />
          )}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
            // refreshing={isFetching}
            // onRefresh={refetch}
            />
          }
        >
          <View style={styles.content}>
            <EmptyPlaceholder height={200} width={240} text="No data" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ItemWarehouseList;

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
