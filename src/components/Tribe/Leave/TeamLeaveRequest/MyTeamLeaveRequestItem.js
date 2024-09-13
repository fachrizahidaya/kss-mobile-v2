import dayjs from "dayjs";

import { View, Text, Pressable, StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomCard from "../../../../styles/CustomCard";

const MyTeamLeaveRequestItem = ({
  employee_image,
  employee_name,
  leave_name,
  days,
  begin_date,
  end_date,
  handleResponse,
  item,
  status,
  index,
  length,
}) => {
  const approvalHandler = async (response) => {
    await SheetManager.hide("form-sheet");
    handleResponse(response, item);
  };

  const renderApprovalOptions = () => (
    <View style={styles.approvalOption}>
      <View style={{ gap: 1, backgroundColor: "#F5F5F5", borderRadius: 10 }}>
        <Pressable onPress={() => approvalHandler("Approved")} style={[styles.containerApproval]}>
          <Text style={[TextProps, { fontSize: 16, fontWeight: "400" }]}>Approve</Text>
        </Pressable>
        <Pressable onPress={() => approvalHandler("Rejected")} style={[styles.containerApproval]}>
          <Text style={[TextProps, { fontSize: 16, fontWeight: "400" }]}>Decline</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <CustomCard index={index} length={length} gap={10}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <AvatarPlaceholder image={employee_image} name={employee_name} size="lg" isThumb={false} />
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#3F434A" }}>{employee_name}</Text>
            <Text style={{ fontSize: 14, fontWeight: "400", color: "#377893" }}>{leave_name}</Text>
          </View>
        </View>
        {status === "Pending" ? (
          <Pressable
            onPress={() =>
              SheetManager.show("form-sheet", {
                payload: {
                  children: renderApprovalOptions(),
                },
              })
            }
          >
            <MaterialCommunityIcons name="dots-vertical" size={20} color="#3F434A" style={{ borderRadius: 20 }} />
          </Pressable>
        ) : null}
      </View>
      <Text style={{ fontSize: 14, fontWeight: "400", color: "#595F69" }}>{item?.reason}</Text>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.leaveTime}>
          <MaterialCommunityIcons name="calendar-month" size={20} color="#3F434A" />
          <Text style={{ fontSize: 12, fontWeight: "400", color: "#595F69" }}>
            {dayjs(begin_date).format("DD MMM YYYY")} - {dayjs(end_date).format("DD MMM YYYY")} • {days}{" "}
            {days < 2 ? "day" : "days"}
          </Text>
        </View>
      </View>
    </CustomCard>
  );
};

export default MyTeamLeaveRequestItem;

const styles = StyleSheet.create({
  containerApproval: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    height: 50,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  approvalOption: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  leaveTime: {
    flexDirection: "row",
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F8F8F8",
  },
});
