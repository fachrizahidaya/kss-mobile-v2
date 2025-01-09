import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const ItemQuotation = ({
  item_id,
  name,
  qty,
  unit,
  total_amount,
  currencyConverter,
  navigation,
  unit_price,
  discount,
  index,
  length,
}) => {
  const dataArr = [
    { title: "Qty", value: `${qty} (${unit})` || "No Data" },
    { title: "Unit Price", value: currencyConverter.format(unit_price) || "No Data" },
    { title: "Discount", value: currencyConverter.format(discount) || "No Data" },
    { title: "Total", value: currencyConverter.format(total_amount) || "No Data" },
  ];

  return (
    <CustomCard gap={8} index={index} length={length}>
      <Text
        style={[TextProps, { fontSize: 12, fontWeight: "600" }]}
        onPress={() => navigation.navigate("Items Detail", { id: item_id })}
      >
        {name}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>
          {qty} {unit}
        </Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>@{currencyConverter.format(unit_price)}</Text>
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Disc. {currencyConverter.format(discount)}</Text>
        <Text style={[TextProps, { fontSize: 12, fontWeight: "600" }]}>{currencyConverter.format(total_amount)}</Text>
      </View>
    </CustomCard>
  );
};

export default ItemQuotation;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
