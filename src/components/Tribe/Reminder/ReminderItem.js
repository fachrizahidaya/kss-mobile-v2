import dayjs from "dayjs";

import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const ReminderItem = ({ description, index, length, request, date, type }) => {
  return (
    <View
      style={[
        styles.wrapper,
        {
          marginLeft: 16,
          marginRight: index === length - 1 ? 16 : null,
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={styles.dateWrapper}>
          <Text style={[TextProps, { fontSize: 12, fontWeight: "700" }]} numberOfLines={1}>
            {dayjs(date).format("DD MMM YYYY")}
          </Text>
        </View>
        <View style={[styles.status, { backgroundColor: "#E8E9EB" }]}>
          <Text style={[TextProps, { fontSize: 10 }]} numberOfLines={1} ellipsizeMode="tail">
            {type}
          </Text>
        </View>
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={[TextProps, { fontSize: 12 }]}>
        {request} - {description}
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
