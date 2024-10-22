import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const Item = ({ invoice_id, invoice_no, debt, payment, discount, total, currencyConverter }) => {
  const dataArr = [
    { title: "Debt Amount Price", value: currencyConverter.format(debt) || "No Data" },
    { title: "Payment Amount", value: currencyConverter.format(payment) || "No Data" },
    { title: "Discount", value: currencyConverter.format(discount) || "No Data" },
    { title: "Total Payment", value: currencyConverter.format(total) || "No Data" },
  ];

  return (
    <CustomCard gap={8}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: 300, fontSize: 12, fontWeight: "600" }]}
        ellipsizeMode="tail"
        numberOfLines={2}
        onPress={() => navigation.navigate("Invoice Detail", { id: invoice_id })}
      >
        {invoice_no}
      </Text>

      <View style={{ gap: 5 }}>
        {dataArr.map((item, index) => {
          return (
            <View key={index} style={styles.data}>
              <Text style={[TextProps, { fontSize: 12 }]}>{item.title}</Text>
              <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%", fontSize: 12 }]}>
                {item.value}
              </Text>
            </View>
          );
        })}
      </View>
    </CustomCard>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E9EB",
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
