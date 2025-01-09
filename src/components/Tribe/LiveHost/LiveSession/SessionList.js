import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";
import SessionListItem from "./SessionListItem";

const screenHeight = Dimensions.get("screen").height;

const SessionList = ({ data, isFetching, isLoading, refetch, hasBeenScrolled, setHasBeenScrolled, fetchMore }) => {
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
            <SessionListItem
              key={index}
              index={index}
              length={data?.length}
              name={item?.name}
              begin_time={item?.begin_time}
              end_time={item?.end_time}
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

export default SessionList;

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
