import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";
import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";

const SalesReceiptListItem = ({
  id,
  sr_no,
  status,
  navigation,
  sr_date,
  index,
  length,
  customer,
  currencyConverter,
  amount,
}) => {
  const dataArr = [
    { title: "Receipt Date", value: sr_date || "No Data", color: null, opacity: 0.5 },
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
      handlePress={() => navigation.navigate("Sales Receipt Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[TextProps, { fontWeight: "600" }]}>{sr_no || "-"}</Text>
      </View>
      <View style={{ gap: 3 }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{sr_date || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{customer || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={[TextProps, { fontSize: 16, fontWeight: "600" }]}>
          {amount < 0 ? `(${currencyConverter.format(Math.abs(amount))})` : currencyConverter.format(amount) || "-"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default SalesReceiptListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
