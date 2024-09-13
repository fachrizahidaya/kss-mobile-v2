import { StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import CustomCard from "../../../styles/CustomCard";

const ReceiptListItem = ({ id, navigation, date, receipt_no, bank, value, voidStatus, formatter, index, length }) => {
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
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Receipt Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={[TextProps]}>{receipt_no}</Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(receipt_no)} />
        </View>
        <Text style={[TextProps]}>{date}</Text>
      </View>
      {dataArr.map((item, index) => {
        return (
          <View key={index} style={styles.data}>
            <Text style={[TextProps]}>{item.title}</Text>
            <Text style={[TextProps, { opacity: item.opacity, textAlign: "right", width: "60%" }]}>{item.value}</Text>
          </View>
        );
      })}
    </CustomCard>
  );
};

export default ReceiptListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
