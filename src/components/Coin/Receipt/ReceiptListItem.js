import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";

const ReceiptListItem = ({
  id,
  navigation,
  date,
  receipt_no,
  bank,
  value,
  voidStatus,
  formatter,
  index,
  length,
  check,
}) => {
  const dataArr = [
    { title: "Cash/Bank", value: bank || "No Data", color: null, opacity: 0.5 },
    { title: "Check No.", value: check || "No Data", color: null, opacity: 0.5 },
    {
      title: "Amount",
      value: value < 0 ? `(${formatter.format(Math.abs(value))})` : formatter.format(value) || "No Data",
      color: value < 0 ? "red" : null,
      opacity: value < 0 ? 1 : 0.5,
    },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Receipt Detail", { id: id })}
    >
      <View style={{ gap: 3 }}>
        <Text style={[TextProps, { fontWeight: "600" }]}>{receipt_no || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{date || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{bank || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={[TextProps, { fontWeight: "600", fontSize: 18, color: value < 0 ? "red" : null }]}>
          {value < 0 ? `(${formatter.format(Math.abs(value))})` : formatter.format(value) || "-"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default ReceiptListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
