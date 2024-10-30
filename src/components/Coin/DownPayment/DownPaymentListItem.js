import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";

const DownPaymentListItem = ({
  id,
  dp_no,
  status,
  dp_date,
  so_no,
  customer_name,
  payment_amount,
  currencyConverter,
  index,
  length,
  navigation,
}) => {
  const dataArr = [
    { title: "DP Date", value: dp_date || "No Data", color: null, opacity: 0.5 },
    { title: "SO No.", value: so_no || "No Data", color: null, opacity: 0.5 },
    { title: "Customer", value: customer_name || "No Data", color: null, opacity: 0.5 },
    {
      title: "Payment Amount",
      value:
        payment_amount < 0
          ? `(${currencyConverter.format(Math.abs(payment_amount))})`
          : currencyConverter.format(payment_amount) || "No Data",
      color: payment_amount < 0 ? "red" : null,
      opacity: payment_amount < 0 ? 1 : 0.5,
    },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Down Payment Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {dp_no || "-"}
        </Text>
        <CustomBadge
          description={status}
          backgroundColor={status === "Pending" ? "#e2e3e5" : status === "Partially" ? "#fef9c3" : "#dcfce6"}
          textColor={status === "Pending" ? "#65758c" : status === "Partially" ? "#cb8c09" : "#16a349"}
        />
      </View>
      <View style={{ gap: 3 }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{dp_date || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{customer_name || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Sales Order : {so_no || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={[TextProps, { fontSize: 16, fontWeight: "600" }]}>
          {payment_amount < 0
            ? `(${currencyConverter.format(Math.abs(payment_amount))})`
            : currencyConverter.format(payment_amount) || "-"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default DownPaymentListItem;

const styles = StyleSheet.create({
  content: {
    marginTop: 14,
    marginHorizontal: 16,
    justifyContent: "space-between",
    gap: 8,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
