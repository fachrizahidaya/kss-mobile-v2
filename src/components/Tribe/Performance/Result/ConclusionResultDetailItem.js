import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../../styles/Card";
import { TextProps } from "../../../shared/CustomStylings";

const ConclusionResultDetailItem = ({ id, type, navigation, employee_grade, supervisor_grade }) => {
  return (
    <Pressable
      style={[card.card, styles.wrapper]}
      onPress={() => navigation.navigate("Conclusion Screen", { id: id, type: type })}
    >
      <View style={{ flexDirection: "column", gap: 10 }}>
        <Text style={[{ fontSize: 16, fontWeight: "700" }, TextProps]}>Conclusion</Text>
        <View style={{ gap: 5 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[TextProps]}>Employee Grade: </Text>
            <Text style={[TextProps]}>{employee_grade}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[TextProps]}>Supervisor Grade: </Text>
            <Text style={[TextProps]}>{supervisor_grade}</Text>
          </View>
        </View>
      </View>
      <MaterialCommunityIcons name={"chevron-right"} size={20} style={{ opacity: 0.5 }} />
    </Pressable>
  );
};

export default ConclusionResultDetailItem;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
    marginHorizontal: 14,
    marginBottom: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
