import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import { CopyToClipboard } from "../../../styles/CopyToClipboard";

const JournalListItem = ({ id, navigation, journal_no, date, transaction_no, total, transaction_type, formatter }) => {
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
    <Pressable style={[card.card, styles.content]} onPress={() => navigation.navigate("Journal Detail", { id: id })}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{journal_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(journal_no)} />
        </View>
        <View style={styles.status}>
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
    </Pressable>
  );
};

export default JournalListItem;

const styles = StyleSheet.create({
  content: {
    marginVertical: 4,
    marginHorizontal: 14,
    justifyContent: "space-between",
    gap: 8,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  status: {
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});
