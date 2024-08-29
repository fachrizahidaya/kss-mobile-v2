import dayjs from "dayjs";

import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const ReminderItem = ({ due_date, description, status, index, length }) => {
  return (
    <View
      style={[
        styles.wrapper,
        {
          borderBottomColor: status === "Overdue" ? "#FEE2E1" : "#FEF9C3",
          marginLeft: 14,
          marginRight: index === length - 1 ? 14 : null,
        },
      ]}
    >
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
  );
};

export default ReminderItem;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 10,
    height: 80,
    borderBottomWidth: 3,
    backgroundColor: "#FFFFFF",
    gap: 12,
    width: 200,
  },
  dateWrapper: { borderRadius: 15 },
  status: {
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
