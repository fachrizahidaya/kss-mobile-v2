import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import EmptyPlaceholder from "../../../styles/EmptyPlaceholder";
import { TextProps } from "../../../styles/CustomStylings";
import ReminderItem from "./ReminderItem";

const Reminder = ({ data, navigation }) => {
  return (
    <View style={[card.card, { flex: 1, gap: 5 }]}>
      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>Reminder</Text>
          <Pressable onPress={() => navigation.navigate("Reminder")} style={styles.showMore}>
            <Text style={[TextProps, { fontSize: 11, marginTop: 0 }]}>Show more</Text>
            <MaterialCommunityIcons name="chevron-right" size={15} color="#3F434A" />
          </Pressable>
        </View>

        {data?.length > 0 ? (
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
                due_date={item?.due_date}
                description={item?.description}
                type={item?.type}
                customer={item?.customer}
                company={item?.company}
              />
            )}
          />
        ) : (
          <EmptyPlaceholder text="No data" />
        )}
      </View>
    </View>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  showMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderRadius: 15,
    padding: 6,
    borderColor: "#E8E9EB",
  },
});
