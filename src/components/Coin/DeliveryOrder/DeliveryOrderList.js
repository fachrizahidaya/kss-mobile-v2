import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import DeliveryOrderListItem from "./DeliveryOrderListItem";

const height = Dimensions.get("screen").height - 300;

const DeliveryOrderList = ({
  isLoading,
  data,
  filteredData,
  hasBeenScrolled,
  setHasBeenScrolled,
  fetchMore,
  isFetching,
  refetch,
  navigation,
}) => {
  return (
    <View style={styles.wrapper}>
      {data.length > 0 || filteredData?.length ? (
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
            <DeliveryOrderListItem
              key={index}
              id={item?.id}
              do_no={item?.do_no}
              status={item?.status}
              do_date={dayjs(item?.so_date).format("DD MMM YYYY")}
              shipping_address={item?.shipping_address}
              navigation={navigation}
              index={index}
              length={data?.length ? data?.length : filteredData?.length}
              customer={item?.customer?.name}
              courier={item?.courier?.name}
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

export default DeliveryOrderList;

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
