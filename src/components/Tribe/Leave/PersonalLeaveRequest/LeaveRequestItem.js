import dayjs from "dayjs";

import { View, Text, Pressable, StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../styles/CustomStylings";
import CustomCard from "../../../../layouts/CustomCard";
import { Colors } from "../../../../styles/Color";

const LeaveRequestItem = ({
  leave_name,
  reason,
  days,
  begin_date,
  end_date,
  status,
  item,
  handleSelect,
  approval_by,
  supervisor_name,
  index,
  length,
}) => {
  const renderScreenSheet = () => {
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <View style={styles.wrapper}>
            <Pressable
              onPress={async () => {
                await SheetManager.hide("form-sheet");
                handleSelect(item);
              }}
              style={styles.content}
            >
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#D64B4B" }}>Cancel Request</Text>
              <MaterialCommunityIcons name="close-circle-outline" size={20} color={Colors.danger} />
            </Pressable>
          </View>
        ),
      },
    });
  };

  return (
    <CustomCard index={index} length={length} gap={10}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[TextProps, { fontSize: 14, fontWeight: "500" }]}>{leave_name}</Text>
        {status === "Pending" ? (
          <Pressable onPress={renderScreenSheet}>
            <MaterialCommunityIcons name="dots-vertical" size={20} color={Colors.iconDark} />
          </Pressable>
        ) : null}
      </View>
      <Text style={{ fontSize: 14, fontWeight: "400", color: "#595F69" }}>{reason}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={styles.time}>
          <MaterialCommunityIcons name="calendar-month" size={15} color={Colors.iconDark} />
          <Text style={{ fontSize: 10, fontWeight: "400", color: "#595F69" }}>
            {dayjs(begin_date).format("DD MMM YYYY")} - {dayjs(end_date).format("DD MMM YYYY")} •
          </Text>
          <Text style={[{ fontSize: 10 }, TextProps]}>{days > 1 ? `${days} days` : `${days} day`}</Text>
        </View>
        {status === "Pending" ? (
          <Text
            style={{ fontSize: 10, fontWeight: "400", color: Colors.primary, width: "30%", textAlign: "right" }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Waiting approval by {approval_by}
          </Text>
        ) : (status === "Approved" || "Rejected") && status !== "Canceled" ? (
          <Text
            style={{ fontSize: 10, fontWeight: "400", color: Colors.primary, width: "20%", textAlign: "right" }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {status} by {approval_by || supervisor_name}
          </Text>
        ) : null}
      </View>
    </CustomCard>
  );
};

export default LeaveRequestItem;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundLight,
    height: 50,
    padding: 10,
    borderRadius: 10,
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 15,
    backgroundColor: Colors.backgroundLight,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  wrapper: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
});
