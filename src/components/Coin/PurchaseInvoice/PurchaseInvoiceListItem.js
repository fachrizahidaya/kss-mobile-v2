import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";
import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";

const PurchaseInvoiceListItem = ({
  id,
  pi_no,
  status,
  pi_date,
  supplier,
  navigation,
  index,
  length,
  amount,
  converter,
  currency,
}) => {
  const dataArr = [
    { title: "Invoice Date", value: pi_date || "No Data", color: null, opacity: 0.5 },
    { title: "Supplier", value: supplier || "No Data", color: null, opacity: 0.5 },
    {
      title: "Amount",
      value: amount < 0 ? `(${converter.format(Math.abs(amount))})` : converter.format(amount) || "No Data",
      color: amount < 0 ? "red" : null,
      opacity: amount < 0 ? 1 : 0.5,
    },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Purchase Invoice Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { fontWeight: "600", maxWidth: 300, overflow: "hidden" }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {pi_no || "-"}
        </Text>
        <CustomBadge
          description={status}
          backgroundColor={status === "Unpaid" ? "#e2e3e5" : status === "Partially Paid" ? "#fef9c3" : "#dcfce6"}
          textColor={status === "Unpaid" ? "#65758c" : status === "Partially Paid" ? "#cb8c09" : "#16a349"}
        />
      </View>
      <View style={{ gap: 3 }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{pi_date || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{supplier || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={[TextProps, { fontSize: 16, fontWeight: "600" }]}>
          {currency} {amount < 0 ? `(${converter.format(Math.abs(amount))})` : converter.format(amount) || "-"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default PurchaseInvoiceListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
