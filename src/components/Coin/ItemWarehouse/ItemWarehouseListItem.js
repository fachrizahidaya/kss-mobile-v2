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
}) => {
  const dataArr = warehouse
    ? [
        { title: "Address", value: warehouse_address },
        { title: "Quantity", value: warehouse_qty },
      ]
    : [
        { title: "Code", value: code },
        { title: "Quantity", value: qty },
      ];

  return (
    <CustomCard index={index} length={length} gap={8}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{warehouse ? warehouse_name : name}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(null)} />
        </View>
      </View>

      {dataArr.map((item, index) => {
        return (
          <View key={index} style={styles.data}>
            <Text style={[TextProps]}>{item.title}</Text>
            <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%" }]}>{item.value}</Text>
          </View>
        );
      })}
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
