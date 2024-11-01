import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";

const SalesOrderListItem = ({
  id,
  so_no,
  navigation,
  status,
  so_date,
  index,
  length,
  customer,
  amount,
  currencyConverter,
  currency,
}) => {
  const dataArr = [
    { title: "SO Date", value: so_date || "No Data", color: null, opacity: 0.5 },
    { title: "Customer", value: customer || "No Data", color: null, opacity: 0.5 },
    {
      title: "Amount",
      value:
        amount < 0 ? `(${currencyConverter.format(Math.abs(amount))})` : currencyConverter.format(amount) || "No Data",
      color: amount < 0 ? "red" : null,
      opacity: amount < 0 ? 1 : 0.5,
    },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Sales Order Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {so_no || "-"}
        </Text>
        <CustomBadge
          description={status}
          backgroundColor={status === "Pending" ? "#e2e3e5" : status === "In Progress" ? "#fef9c3" : "#dcfce6"}
          textColor={status === "Pending" ? "#65758c" : status === "In Progress" ? "#cb8c09" : "#16a349"}
        />
      </View>
      <View style={{ gap: 3 }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{so_date || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{customer || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={[TextProps, { fontSize: 16, fontWeight: "600" }]}>
          {currency}{" "}
          {amount < 0 ? `(${currencyConverter.format(Math.abs(amount))})` : currencyConverter.format(amount) || "-"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default SalesOrderListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
