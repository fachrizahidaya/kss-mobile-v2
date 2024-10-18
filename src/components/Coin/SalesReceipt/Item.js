import { Pressable, StyleSheet, Text } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const Item = ({ invoice_id, invoice_no, debt, payment, discount, total, currencyConverter }) => {
  return (
    <Pressable style={styles.container}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: 100, fontSize: 12 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
        onPress={() => navigation.navigate("Invoice Detail", { id: invoice_id })}
      >
        {invoice_no}
      </Text>
      <Text
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 80 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {currencyConverter.format(debt)}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={2}
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 100 }]}
      >
        {currencyConverter.format(payment)}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={2}
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 100 }]}
      >
        {currencyConverter.format(discount)}
      </Text>
      <Text
        ellipsizeMode="tail"
        numberOfLines={2}
        style={[TextProps, { fontSize: 12, overflow: "hidden", maxWidth: 100 }]}
      >
        {currencyConverter.format(total)}
      </Text>
    </Pressable>
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
});
