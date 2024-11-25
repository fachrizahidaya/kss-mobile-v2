import dayjs from "dayjs";

import { Text, View } from "react-native";

import CustomCard from "../../../../layouts/CustomCard";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomBadge from "../../../../styles/CustomBadge";
import { Colors } from "../../../../styles/Color";

const HistoryDetailList = ({ brand, begin_time, end_time, real_achievement, formatter, hosts, date }) => {
  return (
    <CustomCard gap={8}>
      <View style={{ gap: 8 }}>
        <View style={{ gap: 3 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>
              Session 1: {begin_time} - {end_time}
            </Text>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{dayjs(date).format("DD MMM YYYY")}</Text>
          </View>

          <Text style={[TextProps, { overflow: "hidden", fontWeight: "600" }]} ellipsizeMode="tail" numberOfLines={2}>
            {brand || "-"}
          </Text>
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
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
          <View style={{ gap: 3, alignItems: "flex-end" }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 10 }]}>Achievement</Text>
            <Text style={[TextProps, { fontWeight: "600", fontSize: 16 }]}>
              {formatter.format(real_achievement) || "-"}
            </Text>
          </View>
        </View>
      </View>
    </CustomCard>
  );
};

export default HistoryDetailList;
