import { memo } from "react";

import { Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import PerformanceListItem from "./PerformanceListItem";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;

const PerformanceList = ({ data, isFetching, isLoading, refetch, navigation, dayjs }) => {
  return (
    <View style={{ flex: 1 }}>
      {data?.length > 0 ? (
        <FlashList
          data={data}
          estimatedItemSize={50}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index}
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          ListFooterComponent={() => isLoading && <ActivityIndicator />}
          // onScrollBeginDrag={() =>
          //   setPersonalHasBeenScrolled(!personalHasBeenScrolled)
          // }
          // onEndReached={
          //   personalHasBeenScrolled === true ? fetchMorePersonal : null
          // }
          renderItem={({ item, index }) => (
            <PerformanceListItem
              key={index}
              index={index}
              length={data?.length}
              id={item?.id}
              start_date={item?.performance_review?.begin_date}
              end_date={item?.performance_review?.end_date}
              navigation={navigation}
              name={item?.employee?.name}
              target={null}
              dayjs={dayjs}
              description={item?.performance_review?.description}
              type="my-team"
            />
          )}
        />
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <View style={styles.content}>
            <EmptyPlaceholder text="No Data" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default memo(PerformanceList);

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
