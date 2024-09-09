import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../../styles/Card";
import { TextProps } from "../../../../styles/CustomStylings";

const AttachmentItem = ({
  description,
  file_name,
  onDelete,
  employee_kpi_id,
  attachment_id,
  index,
  indexes,
  length,
}) => {
  return (
    <View
      style={[
        card.card,
        styles.wrapper,
        { marginHorizontal: 16, marginTop: 14, marginBottom: indexes === length - 1 ? 14 : null },
      ]}
    >
      <View style={{ flexDirection: "column", gap: 10 }}>
        <Text style={[TextProps]}>{description}</Text>
        <View style={{ backgroundColor: "#f8f8f8", padding: 5, borderRadius: 10, flexWrap: "wrap" }}>
          <Text style={[TextProps, { fontSize: 10, color: "#176688" }]}>{file_name}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={20}
          onPress={() => onDelete(employee_kpi_id, attachment_id, index)}
        />
      </View>
    </View>
  );
};

export default AttachmentItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
});
