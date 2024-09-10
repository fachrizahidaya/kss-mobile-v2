import dayjs from "dayjs";

import { StyleSheet, View, ActivityIndicator, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import PurchaseOrderListItem from "./PurchaseOrderListItem";
import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";

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
}) => {
  return (
    <View>
      {data.length > 0 || filteredData?.length ? (
        <FlashList
          data={data.length ? data : filteredData}
          onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          onEndReached={hasBeenScrolled ? fetchMore : null}
          ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
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
            />
          )}
        />
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <View style={styles.content}>
            <EmptyPlaceholder height={200} width={240} text="No data" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default PurchaseOrderList;

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
