import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import DownPaymentListItem from "./DownPaymentListItem";

const height = Dimensions.get("screen").height - 300;

const DownPaymentList = ({
  data,
  isLoading,
  isFetching,
  refetch,
  fetchMore,
  filteredData,
  hasBeenScrolled,
  setHasBeenScrolled,
  currencyConverter,
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
          ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          estimatedItemSize={70}
          renderItem={({ item, index }) => (
            <DownPaymentListItem
              key={index}
              dp_no={item?.dp_no}
              status={item?.status}
              dp_date={dayjs(item?.dp_date).format("DD MMM YYYY")}
              shipping_address={item?.shipping_address}
              so_no={item?.sales_order_for_all?.so_no}
              customer_name={item?.customer_for_all?.name}
              payment_amount={item?.payment_amount}
              currencyConverter={currencyConverter}
              index={index}
              length={data?.length ? data?.length : filteredData?.length}
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

export default DownPaymentList;

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
