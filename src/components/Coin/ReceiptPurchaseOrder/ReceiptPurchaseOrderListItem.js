import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";

const ReceiptPurchaseOrderListItem = ({
  navigation,
  id,
  receipt_no,
  receipt_date,
  index,
  length,
  status,
  supplier,
}) => {
  const dataArr = [
    { title: "Receive Date", value: receipt_date || "No Data" },
    { title: "Supplier", value: supplier || "No Data" },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Receipt Purchase Order Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text
            style={[TextProps, { fontWeight: "600", maxWidth: 300, overflow: "hidden" }]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {receipt_no}
          </Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(receipt_no)} />
        </View>
        <CustomBadge
          backgroundColor={status === "Received" ? "#dcfce6" : "#fef9c3"}
          textColor={status === "Received" ? "#16a349" : "#cb8c09"}
          description={status}
        />
      </View>
      <View style={{ marginTop: 8, gap: 8 }}>
        {dataArr.map((item, index) => {
          return (
            <View key={index} style={styles.data}>
              <Text style={[TextProps]}>{item.title}</Text>
              <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%" }]}>{item.value}</Text>
            </View>
          );
        })}
      </View>
    </CustomCard>
  );
};

export default ReceiptPurchaseOrderListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
