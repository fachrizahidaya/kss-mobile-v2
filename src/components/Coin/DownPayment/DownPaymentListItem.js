import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const DownPaymentListItem = ({
  dp_no,
  status,
  dp_date,
  so_no,
  customer_name,
  payment_amount,
  currencyConverter,
  index,
  length,
}) => {
  const dataArr = [
    { title: "SO Number", value: so_no },
    { title: "DP Date", value: dp_date },
    { title: "Customer", value: customer_name },
    { title: "Payment Amount", value: currencyConverter.format(payment_amount) },
  ];

  return (
    <CustomCard index={index} length={length} gap={8}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{dp_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(dp_no)} />
        </View>
        <View style={styles.status}>
          <Text style={[TextProps, { color: status === "Paid" ? "#21a143" : "#e56e18" }]}>{status}</Text>
        </View>
      </View>
      {dataArr.map((item, index) => {
        return (
          <View key={index} style={styles.data}>
            <Text style={[TextProps]}>{item.title}</Text>
            <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%" }]}>
              {item.value ? item.value : "No Data"}
            </Text>
          </View>
        );
      })}
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
  status: {
    backgroundColor: "#fff7f2",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-end",
  },
});
