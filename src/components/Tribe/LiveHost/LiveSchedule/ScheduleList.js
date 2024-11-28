import dayjs from "dayjs";

import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";
import ScheduleListItem from "./ScheduleListItem";

const screenHeight = Dimensions.get("screen").height;

const ScheduleList = ({
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
            <ScheduleListItem
              key={index}
              index={index}
              length={data?.length}
              id={item?.id}
              date={dayjs(item?.date).format("DD MMM YYYY")}
              navigation={navigation}
              sessions={item?.session_count}
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

export default ScheduleList;

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
