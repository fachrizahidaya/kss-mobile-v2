import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";
import { TextProps } from "../../../styles/CustomStylings";

const QuotationListItem = ({
  id,
  index,
  status,
  navigation,
  length,
  date,
  quotation_no,
  sales,
  customer,
  amount,
  converter,
  currency,
}) => {
  const dataArr = [
    { title: "Quotation Date", value: date || "No Data", color: null, opacity: 0.5 },
    { title: "Sales Person", value: sales || "No Data", color: null, opacity: 0.5 },
    { title: "Customer", value: customer || "No Data", color: null, opacity: 0.5 },
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
      handlePress={() => navigation.navigate("Quotation Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {quotation_no || "-"}
        </Text>
        <CustomBadge
          description={status}
          backgroundColor={status === "Pending" ? "#e2e3e5" : status === "Partially" ? "#fef9c3" : "#dcfce6"}
          textColor={status === "Pending" ? "#65758c" : status === "Partially" ? "#cb8c09" : "#16a349"}
        />
      </View>
      <View style={{ gap: 3 }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{date || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{customer || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={[TextProps, { fontSize: 16, fontWeight: "600" }]}>
          {currency} {amount < 0 ? `(${converter.format(Math.abs(amount))})` : converter.format(amount) || "-"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default QuotationListItem;
