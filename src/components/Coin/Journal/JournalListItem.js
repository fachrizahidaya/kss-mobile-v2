import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";

const JournalListItem = ({
  id,
  navigation,
  journal_no,
  date,
  transaction_no,
  total,
  transaction_type,
  formatter,
  index,
  length,
  currency,
}) => {
  const dataArr = [
    { title: "Transaction No.", value: transaction_no || "No Data", color: null, opacity: 0.5 },
    { title: "Transaction Type", value: transaction_type || "No Data", color: null, opacity: 0.5 },
    {
      title: "Total",
      value: total < 0 ? `(${formatter.format(Math.abs(total))})` : formatter.format(total) || "No Data",
      color: total < 0 ? "red" : null,
      opacity: total < 0 ? 1 : 0.5,
    },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Journal Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { fontWeight: "600", maxWidth: 200, overflow: "hidden" }]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {journal_no || "-"}
        </Text>
        <Text style={[TextProps, { opacity: 0.5 }]}>{date || "-"}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>
          {`${transaction_type} : ${transaction_no}` || "-"}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={[TextProps, { fontWeight: "600", fontSize: 18, color: total < 0 ? "red" : null }]}>
          {currency} {total < 0 ? `(${formatter.format(Math.abs(total))})` : formatter.format(total) || "-"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default JournalListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
