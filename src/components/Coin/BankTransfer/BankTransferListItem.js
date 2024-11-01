import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const BankTransferListItem = ({
  id,
  navigation,
  date,
  transfer_no,
  input_no,
  output_no,
  input_name,
  output_name,
  index,
  length,
  formatter,
  in_value,
  out_value,
  currency,
}) => {
  const dataArr = [
    { title: "From Bank", value: `${input_name}` || "No Data" },
    { title: "To Bank", value: `${output_name}` || "No Data" },
    {
      title: "Amount (Out)",
      value: out_value < 0 ? `(${Math.abs(out_value)})` : out_value || "No Data",
      color: out_value < 0 ? "red" : null,
      opacity: out_value < 0 ? 1 : 0.5,
    },
    {
      title: "Amount (In)",
      value: in_value < 0 ? `(${Math.abs(in_value)})` : in_value || "No Data",
      color: in_value < 0 ? "red" : null,
      opacity: in_value < 0 ? 1 : 0.5,
    },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Bank Transfer Detail", { id: id })}
    >
      <View style={{ gap: 3 }}>
        <Text style={[TextProps, { fontWeight: "600" }]}>{transfer_no || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{date || "-"}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{input_name || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[TextProps, { fontSize: 16 }]}>In: </Text>
          <Text style={{ color: "#16A349", fontSize: 16 }}>
            {currency} {in_value || "-"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[TextProps, { fontSize: 16 }]}>Out: </Text>
          <Text style={{ color: "#FD7972", fontSize: 16 }}>
            {currency} {out_value || "-"}
          </Text>
        </View>
      </View>
    </CustomCard>
  );
};

export default BankTransferListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
