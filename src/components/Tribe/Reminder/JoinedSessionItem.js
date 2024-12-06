import { Text, View } from "react-native";

import JoinedSessionCard from "./JoinedSessionCard";
import { TextProps } from "../../../styles/CustomStylings";
import CustomBadge from "../../../styles/CustomBadge";
import { Colors } from "../../../styles/Color";

const JoinedSessionItem = ({
  index,
  length,
  session_name,
  begin_time,
  end_time,
  date,
  brand,
  host_name,
  host,
  host_type,
}) => {
  return (
    <JoinedSessionCard index={index} length={length}>
      <View style={{ gap: 8 }}>
        <View style={{ gap: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>
              {session_name}, {begin_time} - {end_time}
            </Text>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{date}</Text>
          </View>
          <Text
            style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {`${brand === "Morning Whistle" ? "MW" : brand === "Terry Palmer" ? "TP" : "MP"} - ${brand}` || "-"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 5 }}>
          {host ? (
            <CustomBadge
              key={index}
              description={`${host_name} - ${host_type}`}
              backgroundColor={Colors.primary}
              textColor={Colors.fontLight}
            />
          ) : null}
        </View>
      </View>
    </JoinedSessionCard>
  );
};

export default JoinedSessionItem;
