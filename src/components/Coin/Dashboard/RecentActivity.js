import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Skeleton } from "moti/skeleton";

import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import { SkeletonCommonProps, TextProps } from "../../../styles/CustomStylings";
import ActivityItem from "./ActivityItem";

const RecentActivity = ({ data, navigation, currentDate, isLoading, refetch }) => {
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.header}>
        <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>Recent Activity</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Pressable onPress={() => navigation.navigate("Activity")} style={styles.showMore}>
            <Text style={[TextProps, { fontSize: 11 }]}>Show more</Text>
            <MaterialCommunityIcons name="chevron-right" size={15} color="#3F434A" />
          </Pressable>
          <Pressable onPress={refetch} style={styles.refresh}>
            <MaterialCommunityIcons name="refresh" size={15} color="#3F434A" />
          </Pressable>
        </View>
      </View>

      {!isLoading ? (
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
              <ActivityItem
                key={index}
                due_date={item?.date}
                description={item?.message}
                currentDate={currentDate}
                status={item?.user?.name}
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

export default RecentActivity;

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
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
  },
});
