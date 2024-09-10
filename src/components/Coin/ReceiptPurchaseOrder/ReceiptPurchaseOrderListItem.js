import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/CopyToClipboard";

const ReceiptPurchaseOrderListItem = ({ navigation, id, receipt_no, receipt_date, index, length }) => {
  return (
    <Pressable
      style={[card.card, styles.content, { marginBottom: index === length - 1 ? 14 : null }]}
      onPress={() => navigation.navigate("Receipt Purchase Order Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={[TextProps]}>{receipt_no}</Text>
        <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(receipt_no)} />
      </View>
      <View style={styles.data}>
        <Text style={[TextProps]}>Receipt Date</Text>
        <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%" }]}>{receipt_date}</Text>
      </View>
    </Pressable>
  );
};

export default ReceiptPurchaseOrderListItem;

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
