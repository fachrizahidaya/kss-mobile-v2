import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../layouts/CustomCard";
import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";

const PurchasePaymentListItem = ({ id, pp_no, pp_date, navigation, index, length, supplier, amount, converter }) => {
  const dataArr = [
    { title: "Payment Date", value: pp_date || "No Data", color: null, opacity: 0.5 },
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
      handlePress={() => navigation.navigate("Purchase Payment Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { fontWeight: "600", maxWidth: 300, overflow: "hidden" }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {pp_no || "-"}
        </Text>
      </View>
      <View style={{ gap: 3 }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{pp_date || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{supplier || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={[TextProps, { fontSize: 16, fontWeight: "600" }]}>
          {amount < 0 ? `(${converter.format(Math.abs(amount))})` : converter.format(amount) || "-"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default PurchasePaymentListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
