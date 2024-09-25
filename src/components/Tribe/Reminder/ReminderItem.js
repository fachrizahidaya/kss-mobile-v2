import dayjs from "dayjs";

import { Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomBadge from "../../../styles/CustomBadge";
import ReminderCard from "../shared/ReminderCard";

const ReminderItem = ({ description, index, length, request, date, type, forSick, navigation }) => {
  return (
    <ReminderCard index={index} length={length} navigation={navigation} forSick={forSick}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View>
          <Text style={[TextProps, { fontSize: 12, fontWeight: "700" }]} numberOfLines={1}>
            {dayjs(date).format("DD MMM YYYY")}
          </Text>
        </View>
        {!forSick ? <CustomBadge backgroundColor="#E8E9EB" description={type} /> : null}
      </View>
      <Text numberOfLines={2} ellipsizeMode="tail" style={[TextProps, { fontSize: 12 }]}>
        {`${request ? request : ""}${request ? "-" : ""}${description}`}
      </Text>
    </ReminderCard>
  );
};

export default ReminderItem;
