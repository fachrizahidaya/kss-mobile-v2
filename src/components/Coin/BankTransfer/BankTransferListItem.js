import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
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
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps, { fontWeight: "600" }]}>{transfer_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(transfer_no)} />
        </View>
        <Text style={[TextProps]}>{date}</Text>
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

export default BankTransferListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
