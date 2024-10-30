import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import AccountHistoryListItem from "./AccountHistoryListItem";

const height = Dimensions.get("screen").height - 300;

const AccountHistoryList = ({
  data,
  isFetching,
  isLoading,
  refetch,
  fetchMore,
  hasBeenScrolled,
  setHasBeenScrolled,
  navigation,
  formatter,
}) => {
  return (
    <View style={styles.wrapper}>
      {data?.length > 0 ? (
        <FlashList
          data={data}
          onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          onEndReached={hasBeenScrolled ? fetchMore : null}
          ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          estimatedItemSize={70}
          renderItem={({ item, index }) => (
            <AccountHistoryListItem
              key={index}
              navigation={navigation}
              transaction_no={item?.transaction_no}
              date={dayjs(item?.date).format("DD MMM YYYY")}
              transaction_type={item?.transaction_type?.name}
              description={item?.description}
              balance={item?.balance}
              mutation={item?.amount}
              format={formatter}
              transaction_id={item?.transaction_id}
              index={index}
              length={data?.length}
              type={item?.type}
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

export default AccountHistoryList;

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
