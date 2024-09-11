import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Skeleton } from "moti/skeleton";

import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import { SkeletonCommonProps, TextProps } from "../../../styles/CustomStylings";
import ReminderItem from "./ReminderItem";

const Reminder = ({ data, refetch, isFetching, forSick, navigation }) => {
  const length = data?.length;

  return (
    <View style={{ gap: 10, marginTop: 14, marginBottom: !forSick ? 8 : null }}>
      {!forSick ? (
        <View style={styles.header}>
          <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>Reminder</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Pressable onPress={refetch} style={styles.refresh}>
              <MaterialCommunityIcons name="refresh" size={15} color="#3F434A" />
            </Pressable>
          </View>
        </View>
      ) : null}

      {!isFetching ? (
        data?.length > 0 ? (
          <FlashList
            data={data}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.1}
            refreshing={true}
            estimatedItemSize={80}
            renderItem={({ item, index }) => (
              <ReminderItem
                key={index}
                index={index}
                due_date={item?.transaction_date}
                description={item?.description}
                status={item?.status}
                length={length}
                request={item?.request}
                date={item?.object_date}
                type={item?.object_type}
                forSick={forSick}
                navigation={navigation}
              />
            )}
          />
        ) : (
          <EmptyPlaceholder text="No data" />
        )
      ) : (
        <View style={{ marginHorizontal: 14 }}>
          <Skeleton width={"100%"} height={80} radius="square" {...SkeletonCommonProps} />
        </View>
      )}
    </View>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 },
  showMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
  },
  refresh: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
  },
});
