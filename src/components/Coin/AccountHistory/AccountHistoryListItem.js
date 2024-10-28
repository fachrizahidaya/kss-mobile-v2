import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";

const AccountHistoryListItem = ({
  navigation,
  date,
  transaction_no,
  description,
  balance,
  transaction_type,
  mutation,
  format,
  transaction_id,
  index,
  length,
  type,
  amount,
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
    <CustomCard
      gap={8}
      index={index}
      length={length}
      backgroundColor={
        transaction_type === "Begin Balance" ? "#FEF9C3" : transaction_type === "Total" ? "#DCFCE7" : "#FFFFFF"
      }
      handlePress={() => navigation.navigate(redirectPage, { id: transaction_id })}
    >
      {transaction_no ? (
        <View style={{ gap: 3 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps]}>{transaction_no}</Text>
            <CustomBadge
              description={type}
              backgroundColor={type === "Debt" ? "#DCFCE6" : "#FFE8E7"}
              textColor={type === "Debt" ? "#16A349" : "#FD7972"}
            />
          </View>
          <Text style={[TextProps]}>{transaction_type || "No Data"}</Text>
          <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{date}</Text>
        </View>
      ) : null}
      {!transaction_no && (
        <View style={{ gap: 3 }}>
          <Text style={[TextProps]}>{transaction_type || "No Data"}</Text>
          <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{description}</Text>
        </View>
      )}

      <View style={{ marginTop: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Mutation</Text>
            <Text style={[TextProps, { fontWeight: "600", fontSize: 16, color: balance < 0 ? "red" : null }]}>
              {balance < 0 ? `(${format.format(Math.abs(amount))})` : format.format(amount) || "No Data"}
            </Text>
          </View>
          <View>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 10 }]}>Balance</Text>
            <Text style={[TextProps, { fontWeight: "600", fontSize: 16, color: balance < 0 ? "red" : null }]}>
              {balance < 0 ? `(${format.format(Math.abs(balance))})` : format.format(balance) || "No Data"}
            </Text>
          </View>
        </View>
      </View>
    </CustomCard>
  );
};

export default AccountHistoryListItem;

const styles = StyleSheet.create({
  content: {
    marginTop: 14,
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
