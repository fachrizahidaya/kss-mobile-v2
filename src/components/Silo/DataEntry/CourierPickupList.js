import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import CourierPickupItem from "./CourierPickupItem";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;

const CourierPickupList = ({
  data,
  handleScroll,
  isFetching,
  refetch,
  isLoading,
  hasBeenScrolled,
  setHasBeenScrolled,
  fetchMore,
}) => {
  return data?.length > 0 ? (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data}
        estimatedItemSize={50}
        onScroll={handleScroll}
        onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
        keyExtractor={(item, index) => index}
        onEndReachedThreshold={0.1}
        onEndReached={hasBeenScrolled ? fetchMore : null}
        ListFooterComponent={() => hasBeenScrolled && isLoading && <ActivityIndicator />}
        refreshing={true}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        renderItem={({ item, index }) => (
          <CourierPickupItem
            awb={item?.awb_no}
            courier={item?.courier?.name}
            image={item?.courier?.image}
            index={index}
            length={data?.length}
            time={dayjs(item?.created_at).format("DD MMM YYYY HH:mm")}
          />
        )}
      />
    </View>
  ) : (
    <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
      <View style={styles.content}>
        <EmptyPlaceholder text="No Data" />
      </View>
    </ScrollView>
  );
};

export default CourierPickupList;

const styles = StyleSheet.create({
  content: {
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
