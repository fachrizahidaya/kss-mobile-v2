import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";
import HostListItem from "./HostListItem";

const screenHeight = Dimensions.get("screen").height;

const HostList = ({
  data,
  filteredData,
  setHasBeenScrolled,
  hasBeenScrolled,
  isFetching,
  refetch,
  isLoading,
  fetchMore,
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
          ListFooterComponent={() => isLoading && <ActivityIndicator />}
          renderItem={({ item, index }) => (
            <HostListItem
              key={index}
              index={index}
              length={data?.length}
              name={item?.employee?.name}
              host_type={item?.host_type}
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

export default HostList;

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
