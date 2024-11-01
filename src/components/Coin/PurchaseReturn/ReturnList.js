import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import ReturnListItem from "./ReturnListItem";

const height = Dimensions.get("screen").height - 300;

const ReturnList = ({
  isLoading,
  data,
  filteredData,
  hasBeenScrolled,
  setHasBeenScrolled,
  fetchMore,
  isFetching,
  refetch,
  navigation,
  converter,
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
            <ReturnListItem
              key={index}
              id={item?.id}
              doc_no={item?.return_no}
              status={item?.status}
              doc_date={dayjs(item?.return_date).format("DD MMM YYYY")}
              shipping_address={item?.shipping_address}
              navigation={navigation}
              index={index}
              length={data?.length ? data?.length : filteredData?.length}
              amount={item?.total_amount}
              supplier={item?.customer?.name}
              converter={converter}
              currency={item?.customer?.currency?.name}
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

export default ReturnList;

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
