import dayjs from "dayjs";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";

const InvoiceItem = ({ invoice_no, status, date, customer }) => {
  return (
    <Pressable style={[card.card, styles.content]} onPress={null}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ gap: 5 }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={[TextProps, { width: 200 }]}>
            {invoice_no}
          </Text>
          <Text style={[TextProps]}>{dayjs(date).format("DD MMM YYYY")}</Text>
          <Text style={[TextProps]}>{customer}</Text>
        </View>
        <View style={styles.status}>
          <Text style={[TextProps, { color: status === "Pending" ? "#21a143" : "#e56e18" }]}>{status}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default InvoiceItem;

const styles = StyleSheet.create({
  content: {
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 8,
    borderColor: "#E8E9EB",
  },
  status: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#f0fbf3",
  },
});
