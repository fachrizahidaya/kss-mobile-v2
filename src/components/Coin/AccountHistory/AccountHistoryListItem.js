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
  transaction_id,
}) => {
  const dataArr = description
    ? [
        { title: "Transaction Type", value: transaction_type || "No Data", color: null, opacity: 0.5 },
        { title: "Description", value: description || "No Data", color: null, opacity: 0.5 },
        {
          title: "Mutation",
          value: mutation < 0 ? `(${format.format(Math.abs(mutation))})` : format.format(mutation) || "No Data",
          color: mutation < 0 ? "red" : null,
          opacity: mutation < 0 ? 1 : 0.5,
        },
      ]
    : [
        { title: "Transaction Type", value: transaction_type || "No Data", color: null, opacity: 0.5 },
        {
          title: "Balance",
          value: balance < 0 ? `(${format.format(Math.abs(balance))})` : format.format(balance) || "No Data",
          color: balance < 0 ? "red" : null,
          opacity: balance < 0 ? 1 : 0.5,
        },
      ];

  const redirectPage = transaction_type === "Pembayaran" ? "Payment Detail" : "Receipt Detail";

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
      onPress={() => navigation.navigate(redirectPage, { id: transaction_id })}
    >
      {transaction_no ? (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={[TextProps]}>{transaction_no}</Text>
            <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(transaction_no)} />
          </View>
          <Text style={[TextProps]}>{date}</Text>
        </View>
      ) : null}
      {dataArr.map((item, index) => {
        return (
          <View key={index} style={styles.data}>
            <Text style={[TextProps]}>{item.title}</Text>
            <Text style={[TextProps, { textAlign: "right", width: "60%", color: item.color, opacity: item.opacity }]}>
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
    marginHorizontal: 16,
    justifyContent: "space-between",
    gap: 8,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
