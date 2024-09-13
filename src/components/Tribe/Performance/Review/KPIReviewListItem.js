import { Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../styles/CustomStylings";
import CustomCard from "../../../../styles/CustomCard";

const KPIReviewListItem = ({
  id,
  start_date,
  end_date,
  navigation,
  name,
  target,
  dayjs,
  target_level,
  description,
  index,
  length,
}) => {
  return (
    <CustomCard
      index={index}
      length={length}
      gap={10}
      handlePress={() => navigation.navigate("Review KPI Detail", { id: id })}
    >
      <Text style={[TextProps]}>{description}</Text>
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

export default KPIReviewListItem;
