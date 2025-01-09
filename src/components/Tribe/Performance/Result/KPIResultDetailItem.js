import { Pressable, StyleSheet, Text, View } from "react-native";

import { card } from "../../../../styles/Card";
import { TextProps } from "../../../../styles/CustomStylings";

const KPIResultDetailItem = ({
  employeeKPI,
  supervisorKPI,
  employeeAppraisal,
  supervisorAppraisal,
  employee_score,
  supervisor_score,
}) => {
  return (
    <Pressable style={[card.card, styles.wrapper]}>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <Text style={[{ fontSize: 16, fontWeight: "700" }, TextProps]}>
          {employeeKPI?.item
            ? employeeKPI?.item || supervisorKPI?.item
            : employeeAppraisal?.item || supervisorAppraisal?.item}
        </Text>
        <View style={{ gap: 5 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[TextProps]}>Employee Score: </Text>
            <Text style={[TextProps]}>
              {parseInt(employee_score)?.toFixed(1)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[TextProps]}>Supervisor Score: </Text>
            <Text style={[TextProps]}>
              {parseInt(supervisor_score)?.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default KPIResultDetailItem;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 14,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
