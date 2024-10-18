import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";

const PurchaseOrderListItem = ({
  id,
  po_no,
  status,
  po_date,
  shipping_address,
  navigation,
  index,
  length,
  supplier,
  amount,
  converter,
}) => {
  const dataArr = [
    { title: "PO Date", value: po_date || "No Data" },
    { title: "Supplier", value: supplier || "No Data" },
    { title: "Shipping Address", value: shipping_address || "No Data" },
    { title: "Amount", value: converter.format(amount) || "No Data" },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Purchase Order Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{po_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(po_no)} />
        </View>
        <CustomBadge
          description={status}
          backgroundColor="#fff7f2"
          textColor={status === "Finish" ? "#21a143" : status === "In Progress" ? "#43ac59" : "#e56e18"}
        />
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

export default PurchaseOrderListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
