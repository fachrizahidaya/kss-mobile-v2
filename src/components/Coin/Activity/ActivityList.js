import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import ActivityListItem from "./ActivityListItem";
import { Colors } from "../../../styles/Color";

const height = Dimensions.get("screen").height - 300;

const ActivityList = ({
  data,
  isFetching,
  isLoading,
  refetch,
  hasBeenScrolled,
  setHasBeenScrolled,
}) => {
  return (
    <View style={styles.wrapper}>
      {data?.length > 0 ? (
        <FlashList
          data={data}
          onScrollBeginDrag={() => setHasBeenScrolled(!hasBeenScrolled)}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            hasBeenScrolled && isFetching && <ActivityIndicator />
          }
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          estimatedItemSize={70}
          renderItem={({ item, index }) => (
            <ActivityListItem
              key={index}
              message={item?.message}
              date={dayjs(item?.date).format("DD MMM YYYY")}
              name={item?.user?.name}
              index={index}
              length={data?.length}
            />
          )}
        />
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        >
          <View style={styles.content}>
            <EmptyPlaceholder text="No data" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ActivityList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
});
