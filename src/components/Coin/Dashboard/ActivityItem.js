import dayjs from "dayjs";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const ActivityItem = ({ due_date, description, index, length }) => {
  return (
    <Pressable onPress={null}>
      <View style={[styles.wrapper, { marginLeft: 14, marginRight: index === length - 1 ? 14 : null }]}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={styles.dateWrapper}>
            <Text style={[TextProps, { fontSize: 12, fontWeight: "700" }]} numberOfLines={1}>
              {dayjs(due_date).format("DD MMM YYYY")}
            </Text>
          </View>
        </View>
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
    gap: 12,
    width: 200,
  },
  dateWrapper: { borderRadius: 15 },
  status: {
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#f0fbf3",
  },
});
