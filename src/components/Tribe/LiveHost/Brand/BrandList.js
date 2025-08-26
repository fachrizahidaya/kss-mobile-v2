import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import BrandListItem from "./BrandListItem";
import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";

const screenHeight = Dimensions.get("screen").height;

const BrandList = ({
  data,
  filteredData,
  isFetching,
  refetch,
  isLoading,
  fetchMore,
  hasBeenScrolled,
  setHasBeenScrolledd,
}) => {
  return (
    <View style={styles.container}>
      {data?.length > 0 || filteredData?.length ? (
        <FlashList
          data={data?.length ? data : filteredData}
          estimatedItemSize={50}
          onScrollBeginDrag={() => setHasBeenScrolledd(true)}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.1}
          onEndReached={hasBeenScrolled ? fetchMore : null}
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          ListFooterComponent={() => isFetching && <ActivityIndicator />}
          renderItem={({ item, index }) => (
            <BrandListItem
              key={index}
              index={index}
              length={data?.length}
              name={item?.name}
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

export default BrandList;

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
