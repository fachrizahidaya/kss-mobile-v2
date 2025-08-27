import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import ActivityItem from "./ActivityItem";
import { Colors } from "../../../styles/Color";

const RecentActivity = ({
  data,
  navigation,
  currentDate,
  refetch,
  isFetching,
  slicedData,
}) => {
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.header}>
        <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>
          Recent Activity
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {data?.length > 5 ? (
            <Pressable
              onPress={() => navigation.navigate("Activity")}
              style={styles.showMore}
            >
              <Text style={[TextProps, { fontSize: 11 }]}>Show more</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={15}
                color={Colors.iconDark}
              />
            </Pressable>
          ) : null}
          <Pressable onPress={refetch} style={styles.refresh}>
            <MaterialCommunityIcons name="refresh" size={15} color={Colors.iconDark} />
          </Pressable>
        </View>
      </View>

      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={slicedData}
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
              index={index}
              length={data?.length}
            />
          )}
        />
      )}
    </View>
  );
};

export default RecentActivity;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  showMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.secondary,
  },
  refresh: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: Colors.secondary,
  },
});
