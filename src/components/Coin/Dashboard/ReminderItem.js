import dayjs from "dayjs";

import { Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomBadge from "../../../styles/CustomBadge";
import ReminderCard from "./ReminderCard";

const ReminderItem = ({ due_date, description, status, index, length }) => {
  return (
    <ReminderCard
      index={index}
      length={length}
      borderBottomColor={status === "Overdue" ? "#FEE2E1" : "#FEF9C3"}
      borderBottomWidth={3}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View>
          <Text style={[TextProps, { fontSize: 12, fontWeight: "700" }]} numberOfLines={1}>
            {dayjs(due_date).format("DD MMM YYYY")}
          </Text>
        </View>
        <CustomBadge
          description={status}
          backgroundColor={status === "Overdue" ? "#FEE2E1" : "#FEF9C3"}
          textColor="#e56e18"
        />
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={[TextProps, { fontSize: 12 }]}>
        {description}
      </Text>
    </ReminderCard>
  );
};

export default ReminderItem;
