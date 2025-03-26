import dayjs from "dayjs";

import { StyleSheet, View, ActivityIndicator, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import PurchaseOrderListItem from "./PurchaseOrderListItem";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;

const PurchaseOrderList = ({
  data,
  isFetching,
  isLoading,
  refetch,
  fetchMore,
  filteredData,
  hasBeenScrolled,
  setHasBeenScrolled,
  navigation,
  converter,
}) => {
  return (
    <View style={styles.wrapper}>
      {data?.length > 0 || filteredData?.length ? (
        <FlashList
          data={data.length ? data : filteredData}
          onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          onEndReached={hasBeenScrolled ? fetchMore : null}
          ListFooterComponent={() =>
            hasBeenScrolled && isFetching && <ActivityIndicator />
          }
          estimatedItemSize={70}
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          renderItem={({ item, index }) => (
            <PurchaseOrderListItem
              key={index}
              id={item?.id}
              po_no={item?.po_no}
              status={item?.status}
              po_date={dayjs(item?.po_date).format("DD MMM YYYY")}
              shipping_address={item?.shipping_address}
              navigation={navigation}
              index={index}
              length={data?.length ? data?.length : filteredData?.length}
              supplier={item?.supplier?.name}
              amount={item?.total_amount}
              converter={converter}
              currency={item?.supplier?.currency?.name}
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

export default PurchaseOrderList;

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
