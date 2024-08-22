import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import { CopyToClipboard } from "../../../styles/CopyToClipboard";

const AccountHistoryListItem = ({
  id,
  navigation,
  date,
  transaction_no,
  type,
  description,
  balance,
  transaction_type,
  mutation,
  format,
}) => {
  const dataArr = description
    ? [
        { title: "Transaction Type", value: transaction_type || "No Data", color: mutation < 0 ? "red" : null },
        { title: "Description", value: description || "No Data", color: mutation < 0 ? "red" : null },
        {
          title: "Mutation",
          value: mutation < 0 ? `(${format.format(Math.abs(mutation))})` : format.format(mutation) || "No Data",
          color: mutation < 0 ? "red" : null,
        },
      ]
    : [
        { title: "Transaction Type", value: transaction_type || "No Data", color: mutation < 0 ? "red" : null },
        {
          title: "Balance",
          value: balance < 0 ? `(${format.format(Math.abs(balance))})` : format.format(balance) || "No Data",
          color: balance < 0 ? "red" : null,
        },
      ];

  return (
    <Pressable
      style={[
        card.card,
        styles.content,
        {
          backgroundColor:
            transaction_type === "Begin Balance" ? "#FEF9C3" : transaction_type === "Total" ? "#DCFCE7" : "#FFFFFF",
        },
      ]}
      onPress={null}
    >
      {transaction_no ? (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={[TextProps]}>{transaction_no}</Text>
            <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(transaction_no)} />
          </View>
          <View style={styles.status}>
            <Text style={[TextProps]}>{date}</Text>
          </View>
        </View>
      ) : null}
      {dataArr.map((item, index) => {
        return (
          <View key={index} style={styles.data}>
            <Text style={[TextProps]}>{item.title}</Text>
            <Text
              style={[
                TextProps,
                {
                  textAlign: "right",
                  width: "60%",
                  color: item.color,
                },
              ]}
            >
              {item.value}
            </Text>
          </View>
        );
      })}
    </Pressable>
  );
};

export default AccountHistoryListItem;

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
