import dayjs from "dayjs";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const ActivityItem = ({ due_date, description, status }) => {
  return (
    <Pressable onPress={null}>
      <View style={[styles.wrapper, { width: 200 }]}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={styles.dateWrapper}>
            <Text style={[TextProps, { fontSize: 12, fontWeight: "700" }]} numberOfLines={1}>
              {dayjs(due_date).format("DD MMM YYYY")}
            </Text>
          </View>
          {/* <View style={styles.status}></View> */}
        </View>
        {/* <Text style={[TextProps, { fontSize: 10 }]}>{status}</Text> */}
        <Text numberOfLines={2} ellipsizeMode="tail" style={[TextProps, { fontSize: 12 }]}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    padding: 10,
    height: 80,
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
    backgroundColor: "#f0fbf3",
  },
});
