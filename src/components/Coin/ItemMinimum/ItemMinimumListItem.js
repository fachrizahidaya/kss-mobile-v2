import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";

const ItemMinimumListItem = ({ name, code, index, length, navigation, stock, unit, min_stock }) => {
  const dataArr = [
    { title: "SKU", value: code || "No Data" },
    { title: "Total Stock", value: stock || "No Data" },
  ];

  return (
    <CustomCard index={index} length={length} gap={8}>
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
          Min Stock: {min_stock || "-"} {unit}
        </Text>
        <Text
          style={[TextProps, { maxWidth: 150, overflow: "hidden", opacity: 0.5, fontSize: 12 }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          Available: {stock || "-"} {unit}
        </Text>
      </View>
    </CustomCard>
  );
};

export default ItemMinimumListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
