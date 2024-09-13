import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../styles/CustomCard";

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
}) => {
  const dataArr = [
    { title: "Transaction No.", value: transaction_no, color: null, opacity: 0.5 },
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{journal_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(journal_no)} />
        </View>
        <View>
          <Text style={[TextProps]}>{date}</Text>
        </View>
      </View>
      {dataArr.map((item, index) => {
        return (
          <View key={index} style={styles.data}>
            <Text style={[TextProps]}>{item.title}</Text>
            <Text style={[TextProps, { opacity: item.opacity, textAlign: "right", width: "60%", color: item.color }]}>
              {item.value}
            </Text>
          </View>
        );
      })}
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
