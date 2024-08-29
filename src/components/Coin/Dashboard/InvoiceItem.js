import dayjs from "dayjs";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";

const InvoiceItem = ({ invoice_no, status, date, customer, amount }) => {
  return (
    <Pressable
      style={[
        card.card,
        styles.content,
        { borderBottomColor: status === "Pending" ? "#FEF9C3" : status === "Paid" ? "#DCFCE7" : "#FEE2E1" },
      ]}
      onPress={null}
    >
      <View style={{ gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ borderRadius: 10 }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[TextProps, { fontSize: 16, fontWeight: "500", maxWidth: 200 }]}
            >
              {invoice_no}
            </Text>
          </View>
          <View
            style={[
              styles.status,
              { backgroundColor: status === "Pending" ? "#FEF9C3" : status === "Paid" ? "#DCFCE7" : "#FEE2E1" },
            ]}
          >
            <Text
              style={[
                TextProps,
                { color: status === "Pending" ? "#CA8A03" : status === "Paid" ? "#16A34A" : "#EF4444", fontSize: 12 },
              ]}
            >
              {status}
            </Text>
          </View>
        </View>

        <Text style={[TextProps, { fontSize: 12 }]}>{dayjs(date).format("DD MMM YYYY")}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={[TextProps, { width: 200, fontSize: 12 }]}>
          {customer}
        </Text>
        <Text style={[TextProps, { fontSize: 16, fontWeight: "500" }]}>{amount}</Text>
      </View>
    </Pressable>
  );
};

export default InvoiceItem;

const styles = StyleSheet.create({
  content: {
    borderBottomWidth: 1,
    marginVertical: 5,
    marginHorizontal: 14,
    borderBottomWidth: 3,
  },
  status: {
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
