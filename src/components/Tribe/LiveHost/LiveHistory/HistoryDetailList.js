import { Text, View } from "react-native";

import CustomCard from "../../../../layouts/CustomCard";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomBadge from "../../../../styles/CustomBadge";
import { Colors } from "../../../../styles/Color";

const HistoryDetailList = ({ brand, begin_time, end_time, real_achievement, min_achievement, formatter, hosts }) => {
  return (
    <CustomCard gap={8}>
      <View style={{ gap: 5 }}>
        <View style={{ gap: 3 }}>
          <Text
            style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {brand || "-"}
          </Text>
          <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>
            {begin_time} - {end_time}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ gap: 3 }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Achievement</Text>
            <Text style={[TextProps, { fontWeight: "600" }]}>{formatter.format(real_achievement) || "-"}</Text>
          </View>
          <View style={{ gap: 3 }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Min. Achievement</Text>
            <Text style={[TextProps, { textAlign: "right", fontWeight: "600" }]}>{min_achievement || "-"}</Text>
          </View>
        </View>
      </View>
      <View style={{ flexWrap: "wrap" }}>
        {hosts?.map((host, index) => {
          return (
            <CustomBadge
              key={index}
              description={host?.employee?.name}
              backgroundColor={Colors.primary}
              textColor={Colors.fontLight}
            />
          );
        })}
      </View>
    </CustomCard>
  );
};

export default HistoryDetailList;
