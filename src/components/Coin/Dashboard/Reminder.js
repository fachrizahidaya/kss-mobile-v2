import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import ReminderItem from "./ReminderItem";
import { Colors } from "../../../styles/Color";

const Reminder = ({
  data,
  navigation,
  currentDate,
  isLoading,
  refetch,
  isFetching,
  slicedData,
}) => {
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.header}>
        <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>Reminder</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {data?.length > 5 ? (
            <Pressable
              onPress={() => navigation.navigate("Reminder")}
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
            <ReminderItem
              key={index}
              index={index}
              due_date={item?.transaction_date}
              description={item?.description}
              currentDate={currentDate}
              status={item?.status}
              length={data?.length}
            />
          )}
        />
      )}
    </View>
  );
};

export default Reminder;

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
