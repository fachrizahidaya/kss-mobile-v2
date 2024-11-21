import dayjs from "dayjs";

import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";
import HistoryListItem from "./HistoryListItem";

const screenHeight = Dimensions.get("screen").height;

const HistoryList = ({
  data,
  isFetching,
  refetch,
  isLoading,
  fetchMore,
  hasBeenScrolled,
  setHasBeenScrolled,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {data?.length > 0 ? (
        <FlashList
          data={data}
          estimatedItemSize={50}
          onScrollBeginDrag={() => setHasBeenScrolled(true)}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          onEndReached={hasBeenScrolled ? fetchMore : null}
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          ListFooterComponent={() => isLoading && <ActivityIndicator />}
          renderItem={({ item, index }) => (
            <HistoryListItem
              key={index}
              id={item?.id}
              index={index}
              length={data?.length}
              date={dayjs(item?.ecom_live_schedule?.date).format("DD MMM YYYY")}
              brand={item?.brand?.name}
              begin_time={item?.begin_time}
              end_time={item?.end_time}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <View style={styles.empty}>
            <EmptyPlaceholder text="No Data" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default HistoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    height: screenHeight - 250,
  },
});
