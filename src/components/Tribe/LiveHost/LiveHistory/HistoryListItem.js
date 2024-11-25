import { Text, View } from "react-native";
import CustomCard from "../../../../layouts/CustomCard";
import { Colors } from "../../../../styles/Color";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomBadge from "../../../../styles/CustomBadge";

const HistoryListItem = ({
  index,
  length,
  date,
  begin_time,
  end_time,
  brand,
  hosts,
  formatter,
  real_achievement,
  host,
}) => {
  return (
    <CustomCard index={index} length={length} gap={8}>
      <View style={{ gap: 8 }}>
        <View style={{ gap: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>
              {begin_time} - {end_time}
            </Text>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{date}</Text>
          </View>
          <Text
            style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {brand || "-"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
          {host ? (
            <CustomBadge key={index} description={host} backgroundColor={Colors.primary} textColor={Colors.fontLight} />
          ) : null}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
          <View style={{ gap: 3, alignItems: "flex-end" }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 10 }]}>Achievement</Text>
            <Text style={[TextProps, { fontWeight: "600", fontSize: 16 }]}>
              {formatter.format(real_achievement) || 0}
            </Text>
          </View>
        </View>
      </View>
    </CustomCard>
  );
};

export default HistoryListItem;
