import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const Item = ({
  item_id,
  name,
  qty,
  unit,
  navigation,
  delivered_qty,
  receive_no,
  receive_date,
  isReceive,
  index,
  length,
}) => {
  const dataArr = isReceive
    ? [{ title: "Receive Date", value: receive_date || "No Data" }]
    : [
        { title: "Qty", value: `${qty} (${unit})` || "No Data" },
        { title: "Delivered Qty", value: `${delivered_qty} (${unit})` || "No Data" },
      ];

  return (
    <CustomCard gap={8} index={index} length={length}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: 300, fontSize: 12, fontWeight: "600" }]}
        ellipsizeMode="tail"
        numberOfLines={1}
        onPress={() => navigation.navigate("Items Detail", { id: item_id })}
      >
        {isReceive ? receive_no : name}
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
