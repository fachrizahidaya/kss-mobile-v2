import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import { CopyToClipboard } from "../../../styles/CopyToClipboard";

const PaymentListItem = ({ id, navigation, date, payment_no, bank, value, voidStatus, formatter }) => {
  const dataArr = [
    { title: "Bank", value: bank, color: null, opacity: 0.5 },
    {
      title: "Value",
      value: value < 0 ? `(${formatter.format(Math.abs(value))})` : formatter.format(value) || "No Data",
      color: value < 0 ? "red" : null,
      opacity: value < 0 ? 1 : 0.5,
    },
    { title: "Void", value: !voidStatus ? "No" : "Yes", color: null, opacity: 0.5 },
  ];

  return (
    <Pressable style={[card.card, styles.content]} onPress={() => navigation.navigate("Payment Detail", { id: id })}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{payment_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(payment_no)} />
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

export default PaymentListItem;

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
