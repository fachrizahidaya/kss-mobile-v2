import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";

const ItemWarehouseListItem = ({
  name,
  code,
  qty,
  index,
  length,
  navigation,
  warehouse,
  warehouse_name,
  warehouse_address,
  warehouse_qty,
  unit,
}) => {
  const dataArr = warehouse
    ? [
        { title: "Code", value: code || "No Data" },
        { title: "Quantity", value: qty || "No Data" },
      ]
    : [
        { title: "Address", value: warehouse_address || "No Data" },
        { title: "Quantity", value: warehouse_qty || "No Data" },
      ];

  return (
    <CustomCard index={index} length={length} gap={8}>
      <View style={{ gap: 3 }}>
        {warehouse ? <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{code || "-"}</Text> : null}
        <Text style={[TextProps, { fontWeight: "600" }]}>{warehouse ? name : warehouse_name || "-"}</Text>
        {warehouse ? null : <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{warehouse_address || "-"}</Text>}
      </View>
      <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>
        Available: {warehouse_qty || "-"} {unit}
      </Text>
    </CustomCard>
  );
};

export default ItemWarehouseListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  status: {
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});
