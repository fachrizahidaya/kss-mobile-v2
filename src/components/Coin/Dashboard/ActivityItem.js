import dayjs from "dayjs";

import { Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import ReminderCard from "../shared/ReminderCard";

const ActivityItem = ({ due_date, description, index, length }) => {
  return (
    <ReminderCard index={index} length={length}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View>
          <Text style={[TextProps, { fontSize: 12, fontWeight: "700" }]} numberOfLines={1}>
            {dayjs(due_date).format("DD MMM YYYY")}
          </Text>
        </View>
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={[TextProps, { fontSize: 12 }]}>
        {description}
      </Text>
    </ReminderCard>
  );
};

export default ActivityItem;
