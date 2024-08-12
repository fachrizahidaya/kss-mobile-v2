import dayjs from "dayjs";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const ReminderItem = ({ due_date, description, status }) => {
  return (
    <Pressable onPress={null}>
      <View style={[styles.wrapper, { borderBottomColor: status === "Overdue" ? "#FEE2E1" : "#FEF9C3", width: 200 }]}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={styles.dateWrapper}>
            <Text style={[TextProps, { fontSize: 12, fontWeight: "700" }]} numberOfLines={1}>
              {dayjs(due_date).format("DD MMM YYYY")}
            </Text>
          </View>
          <View style={[styles.status, { backgroundColor: status === "Overdue" ? "#FEE2E1" : "#FEF9C3" }]}>
            <Text style={[TextProps, { color: "#e56e18", fontSize: 10 }]}>{status}</Text>
          </View>
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={[TextProps, { fontSize: 12 }]}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

export default ReminderItem;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 10,
    height: 80,
    borderBottomWidth: 5,
    backgroundColor: "#FFFFFF",
    marginLeft: 14,
    marginRight: 8,
    gap: 6,
  },
  dateWrapper: { borderRadius: 15, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: "#F8F8F8" },
  status: {
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
