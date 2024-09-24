import { Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../styles/CustomStylings";
import CustomCard from "../../../../layouts/CustomCard";

const KPIDetailItem = ({
  target,
  achievement,
  description,
  handleOpen,
  item,
  employeeKpiValue,
  setKpi,
  setEmployeeKpi,
  reference,
  index,
  length,
}) => {
  return (
    <CustomCard
      index={index}
      length={length}
      gap={10}
      handlePress={() => handleOpen(item, employeeKpiValue, setKpi, setEmployeeKpi, reference)}
    >
      <Text style={[TextProps]}>{description}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <MaterialCommunityIcons name={"chart-bar"} size={15} style={{ opacity: 0.5 }} />

        <Text style={[TextProps]}>{achievement || 0} of</Text>
        <Text style={[TextProps]}>{target}</Text>
      </View>
    </CustomCard>
  );
};

export default KPIDetailItem;
