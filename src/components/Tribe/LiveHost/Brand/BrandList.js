import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import BrandListItem from "./BrandListItem";
import EmptyPlaceholder from "../../../../layouts/EmptyPlaceholder";

const BrandList = ({ data, isFetching, refetch, isLoading }) => {
  return (
    <View style={styles.container}>
      {data?.length > 0 ? (
        <FlashList
          data={data}
          estimatedItemSize={50}
          refreshing={true}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          ListFooterComponent={() => isLoading && <ActivityIndicator />}
          renderItem={({ item, index }) => <BrandListItem key={index} index={index} length={data?.length} />}
        />
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
          <View>
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
});
