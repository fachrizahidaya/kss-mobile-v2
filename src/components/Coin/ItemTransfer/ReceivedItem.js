import dayjs from "dayjs";

import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import Item from "./Item";

const ReceivedItem = ({ isReceive, data, isLoading, navigation }) => {
  const screenHeight = Dimensions.get("screen").height;

  return (
    <View style={styles.wrapper}>
      <View style={{ height: screenHeight - 500 }}>
        {!isLoading ? (
          data?.length > 0 ? (
            <FlashList
              data={data}
              keyExtractor={(item, index) => index}
              onEndReachedThreshold={0.1}
              estimatedItemSize={50}
              renderItem={({ item, index }) => (
                <Item
                  key={index}
                  name={null}
                  qty={null}
                  delivered_qty={null}
                  receive_date={dayjs(item?.receive_date).format("DD MMM YYYY")}
                  receive_no={item?.receive_no}
                  unit={null}
                  item_id={null}
                  navigation={navigation}
                  isReceive={isReceive}
                />
              )}
            />
          ) : (
            <EmptyPlaceholder text="No data" />
          )
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </View>
  );
};

export default ReceivedItem;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E9EB",
  },
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
