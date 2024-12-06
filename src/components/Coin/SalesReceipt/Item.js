import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";
import { Colors } from "../../../styles/Color";

const Item = ({ invoice_id, invoice_no, debit, payment, discount, total, currencyConverter, index, length }) => {
  const dataArr = [
    { title: "Debit Amount Price", value: currencyConverter.format(debit) || "No Data" },
    { title: "Payment Amount", value: currencyConverter.format(payment) || "No Data" },
    { title: "Discount", value: currencyConverter.format(discount) || "No Data" },
    { title: "Total Payment", value: currencyConverter.format(total) || "No Data" },
  ];

  return (
    <CustomCard gap={8} index={index} length={length}>
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
    borderBottomColor: Colors.borderGrey,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
