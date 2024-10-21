import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";

const DownPaymentListItem = ({
  id,
  dp_no,
  status,
  dp_date,
  so_no,
  customer_name,
  payment_amount,
  currencyConverter,
  index,
  length,
  navigation,
}) => {
  const dataArr = [
    { title: "DP Date", value: dp_date || "No Data", color: null, opacity: 0.5 },
    { title: "SO No.", value: so_no || "No Data", color: null, opacity: 0.5 },
    { title: "Customer", value: customer_name || "No Data", color: null, opacity: 0.5 },
    {
      title: "Payment Amount",
      value:
        payment_amount < 0
          ? `(${currencyConverter.format(Math.abs(payment_amount))})`
          : currencyConverter.format(payment_amount) || "No Data",
      color: payment_amount < 0 ? "red" : null,
      opacity: payment_amount < 0 ? 1 : 0.5,
    },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Down Payment Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps, { fontWeight: "600" }]}>{dp_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(dp_no)} />
        </View>
        <CustomBadge
          description={status}
          backgroundColor={status === "Pending" ? "#e2e3e5" : status === "Partially" ? "#fef9c3" : "#dcfce6"}
          textColor={status === "Pending" ? "#65758c" : status === "Partially" ? "#cb8c09" : "#16a349"}
        />
      </View>
      <View style={{ marginTop: 8, gap: 8 }}>
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
      </View>
    </CustomCard>
  );
};

export default DownPaymentListItem;

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
