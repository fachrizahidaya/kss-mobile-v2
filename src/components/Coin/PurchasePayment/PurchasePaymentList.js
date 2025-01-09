import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import PurchasePaymentListItem from "./PurchasePaymentListItem";

const height = Dimensions.get("screen").height - 300;

const PurchasePaymentList = ({
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
          ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
          estimatedItemSize={70}
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          renderItem={({ item, index }) => (
            <PurchasePaymentListItem
              key={index}
              id={item?.id}
              pp_no={item?.payment_no}
              pp_date={dayjs(item?.payment_date).format("DD MMM YYYY")}
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
        <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <View style={styles.content}>
            <EmptyPlaceholder text="No data" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default PurchasePaymentList;

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
