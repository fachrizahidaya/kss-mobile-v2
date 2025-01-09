import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";

const JournalLogListItem = ({
  id,
  navigation,
  journal_no,
  date,
  transaction_no,
  type,
  index,
  length,
  formatter,
  total,
}) => {
  const dataArr = [
    { title: "Transaction No.", value: transaction_no || "No Data" },
    { title: "Transaction Type", value: type || "No Data" },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Journal Log Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { fontWeight: "600", maxWidth: 200, overflow: "hidden" }]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {journal_no || "-"}
        </Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{date || "-"}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{`${type} : ${transaction_no}` || ""}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
        <Text style={[TextProps, { fontWeight: "600", fontSize: 18, color: total < 0 ? "red" : null }]}>
          {total < 0 ? `(${formatter.format(Math.abs(total))})` : formatter.format(total) || "-"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default JournalLogListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
