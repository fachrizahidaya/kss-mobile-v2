import dayjs from "dayjs";

import { Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../styles/CustomStylings";
import CustomCard from "../../../../styles/CustomCard";

const KPIListItem = ({
  id,
  start_date,
  end_date,
  navigation,
  name,
  target,
  isExpired,
  target_level,
  index,
  length,
}) => {
  const params = { id: id, isExpired: isExpired };

  return (
    <CustomCard index={index} length={length} handlePress={() => navigation.navigate("KPI Detail", params)} gap={10}>
      <Text style={[TextProps]}>{name}</Text>
      <View>
        <Text style={[{ opacity: 0.5 }, TextProps]}>{target_level}</Text>
        <Text style={[TextProps]}>{target}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <MaterialCommunityIcons name="calendar-month" size={15} style={{ opacity: 0.5 }} />
        <Text style={[{ opacity: 0.5 }, TextProps]}>{dayjs(start_date).format("DD MMM YYYY")} to</Text>
        <Text style={[{ opacity: 0.5 }, TextProps]}>{dayjs(end_date).format("DD MMM YYYY")}</Text>
      </View>
    </CustomCard>
  );
};

export default KPIListItem;
