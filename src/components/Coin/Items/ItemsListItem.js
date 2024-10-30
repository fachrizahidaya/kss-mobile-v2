import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../layouts/CustomCard";
import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";

const ItemsListItem = ({ id, name, code, available_qty, qty, unit, index, length, navigation, category }) => {
  const dataArr = [
    { title: "SKU", value: code || "No Data" },
    { title: "Category", value: category || "No Data" },
    // { title: "Unit", value: unit || "No Data" },
    // { title: "Total Stock", value: qty || "No Data" },
    { title: "Available Stock", value: qty - available_qty || "No Data" },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Items Detail", { id: id })}
    >
      <View style={{ gap: 3 }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{code || "-"}</Text>
        <Text style={[TextProps, { fontWeight: "600" }]}>{name || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { maxWidth: 150, overflow: "hidden", opacity: 0.5, fontSize: 12 }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {category || "-"}
        </Text>
        <Text
          style={[TextProps, { maxWidth: 150, overflow: "hidden", opacity: 0.5, fontSize: 12 }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          Available: {qty - available_qty || "-"} {unit}
        </Text>
      </View>
    </CustomCard>
  );
};

export default ItemsListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
