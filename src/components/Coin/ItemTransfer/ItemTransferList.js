import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import ItemTransferListItem from "./ItemTransferListItem";

const height = Dimensions.get("screen").height - 300;

const ItemTransferList = ({
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
          ListFooterComponent={() =>
            hasBeenScrolled && isFetching && <ActivityIndicator />
          }
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          estimatedItemSize={70}
          renderItem={({ item, index }) => (
            <ItemTransferListItem
              key={index}
              id={item?.id}
              transfer_no={item?.transfer_no}
              date={dayjs(item?.transfer_date).format("DD MMM YYYY")}
              status={item?.status}
              index={index}
              length={data?.length ? data?.length : filteredData?.length}
              navigation={navigation}
              origin={item?.from_warehouse?.name}
              target={item?.to_warehouse?.name}
            />
          )}
        />
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        >
          <View style={styles.content}>
            <EmptyPlaceholder text="No data" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ItemTransferList;

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
