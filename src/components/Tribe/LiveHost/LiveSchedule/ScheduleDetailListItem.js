import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../../layouts/CustomCard";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";
import ScheduleAchievement from "./ScheduleAchievement";
import { useEffect } from "react";

const ScheduleDetailListItem = ({
  begin_time,
  brand,
  end_time,
  min_achievement,
  index,
  length,
  real_achievement,
  handleOpenSheet,
  reference,
  achievement,
  handleCurrentAchievement,
  handleUpdate,
  isLoading,
  formatter,
  item,
}) => {
  useEffect(() => {
    handleCurrentAchievement(real_achievement);
  }, [item]);

  return (
    <>
      <CustomCard handlePress={handleOpenSheet} index={index} length={length} gap={8}>
        <View style={{ gap: 5 }}>
          <View style={{ gap: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text
                style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
                ellipsizeMode="tail"
                numberOfLines={2}
              >
                {brand || "-"}
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.iconDark} />
            </View>
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
      </CustomCard>
      <ScheduleAchievement
        reference={reference}
        real_achievement={achievement}
        handleUpdate={handleUpdate}
        isLoading={isLoading}
      />
    </>
  );
};

export default ScheduleDetailListItem;
