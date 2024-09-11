import { Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import CourierPickupItem from "./CourierPickupItem";
import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";

const height = Dimensions.get("screen").height - 300;

const CourierPickupList = ({ data, handleScroll, isFetching, refetch }) => {
  return data?.length > 0 ? (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data}
        estimatedItemSize={50}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <CourierPickupItem awb={item?.awb_no} courier={item?.courier?.name} image={item?.courier?.image} />
        )}
      />
    </View>
  ) : (
    <ScrollView refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}>
      <View style={styles.content}>
        <EmptyPlaceholder height={250} width={250} text="No Data" />
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
