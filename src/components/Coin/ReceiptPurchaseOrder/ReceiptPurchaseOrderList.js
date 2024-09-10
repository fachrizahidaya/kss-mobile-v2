import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import ReceiptPurchaseOrderListItem from "./ReceiptPurchaseOrderListItem";

const height = Dimensions.get("screen").height - 300;

const ReceiptPurchaseOrderList = ({
  data,
  filteredData,
  hasBeenScrolled,
  setHasBeenScrolled,
  isFetching,
  isLoading,
  refetch,
  navigation,
  fetchMore,
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
            <ReceiptPurchaseOrderListItem
              key={index}
              id={item?.id}
              receipt_no={item?.receipt_no}
              receipt_date={dayjs(item?.receipt_date).format("DD MMM YYYY")}
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

export default ReceiptPurchaseOrderList;

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
