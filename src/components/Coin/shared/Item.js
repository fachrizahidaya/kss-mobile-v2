import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const Item = ({
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
        style={[TextProps, { overflow: "hidden", maxWidth: 300, fontSize: 12, fontWeight: "600" }]}
        ellipsizeMode="tail"
        numberOfLines={2}
        onPress={() => navigation.navigate("Items Detail", { id: item_id })}
      >
        {name}
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
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
