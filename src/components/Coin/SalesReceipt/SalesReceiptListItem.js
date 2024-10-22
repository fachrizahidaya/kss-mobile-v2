import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../layouts/CustomCard";
import CustomBadge from "../../../styles/CustomBadge";
import { TextProps } from "../../../styles/CustomStylings";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";

const SalesReceiptListItem = ({
  id,
  sr_no,
  status,
  navigation,
  sr_date,
  index,
  length,
  customer,
  currencyConverter,
  amount,
}) => {
  const dataArr = [
    { title: "Receipt Date", value: sr_date || "No Data", color: null, opacity: 0.5 },
    { title: "Customer", value: customer || "No Data", color: null, opacity: 0.5 },
    {
      title: "Amount",
      value:
        amount < 0 ? `(${currencyConverter.format(Math.abs(amount))})` : currencyConverter.format(amount) || "No Data",
      color: amount < 0 ? "red" : null,
      opacity: amount < 0 ? 1 : 0.5,
    },
  ];

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Sales Receipt Detail", { id: id })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text
            style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {sr_no}
          </Text>
          <MaterialCommunityIcons name="content-copy" size={12} onPress={() => CopyToClipboard(sr_no)} />
        </View>
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

export default SalesReceiptListItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
