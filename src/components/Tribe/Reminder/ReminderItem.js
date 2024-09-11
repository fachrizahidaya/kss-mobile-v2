import dayjs from "dayjs";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const ReminderItem = ({ description, index, length, request, date, type, forSick, navigation }) => {
  return (
    <Pressable
      style={[
        styles.wrapper,
        {
          marginLeft: 16,
          marginRight: index === length - 1 ? 16 : null,
          backgroundColor: !forSick ? "#FFFFFF" : "#EDEDED",
        },
      ]}
      onPress={() => navigation.navigate("Attendance")}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={styles.dateWrapper}>
          <Text style={[TextProps, { fontSize: 12, fontWeight: "700" }]} numberOfLines={1}>
            {dayjs(date).format("DD MMM YYYY")}
          </Text>
        </View>
        {!forSick ? (
          <View style={[styles.status, { backgroundColor: "#E8E9EB" }]}>
            <Text style={[TextProps, { fontSize: 10 }]} numberOfLines={1} ellipsizeMode="tail">
              {type}
            </Text>
          </View>
        ) : null}
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={[TextProps, { fontSize: 12 }]}>
        {`${request ? request : ""}${request ? "-" : ""}${description}`}
      </Text>
    </Pressable>
  );
};

export default ReminderItem;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 10,
    height: 80,
    gap: 12,
    width: 250,
  },
  dateWrapper: { borderRadius: 15 },
  status: {
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
