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
  formatter,
  updateAccess,
  setHistory,
  filteredData,
}) => {
  return (
    <View style={styles.container}>
      {data?.length > 0 || filteredData?.length ? (
        <FlashList
          data={data?.length ? data : filteredData}
          estimatedItemSize={50}
          onScrollBeginDrag={() => setHasBeenScrolled(true)}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          onEndReached={hasBeenScrolled ? fetchMore : null}
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          ListFooterComponent={() => isFetching && <ActivityIndicator />}
          renderItem={({ item, index }) => (
            <HistoryListItem
              key={index}
              id={item?.id}
              index={index}
              length={data?.length ? data?.length : filteredData?.length}
              date={dayjs(item?.date).format("DD MMM YYYY")}
              brand={item?.brand?.name}
              begin_time={item?.begin_time}
              end_time={item?.end_time}
              navigation={navigation}
              hosts={item?.host}
              host={item?.host}
              host_name={item?.host?.employee?.name}
              host_type={item?.host?.host_type}
              formatter={formatter}
              real_achievement={item?.actual_achievement}
              session_name={item?.session_name}
              refetch={refetch}
              updateAccess={updateAccess}
              achievementSubmitted={item?.calculated}
              setHistory={setHistory}
              joined_time={dayjs(item?.created_at).format("HH:mm")}
            />
          )}
        />
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        >
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
