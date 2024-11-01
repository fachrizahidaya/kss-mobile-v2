import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const CostItem = ({ name, amount, notes, index, length, coa, converter }) => {
  const dataArr = [
    { title: "Amount", value: converter.format(amount) || "-" },
    { title: "Notes", value: notes || "-" },
  ];

  return (
    <CustomCard gap={8} index={index} length={length}>
      <Text
        style={[TextProps, { overflow: "hidden", width: 300, fontWeight: "600", fontSize: 12 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {coa} - {name}
      </Text>

      <View style={{ gap: 5 }}>
        {dataArr.map((item, index) => {
          return (
            <View key={index} style={styles.data}>
              <Text style={[TextProps, { fontSize: 12, opacity: 0.5 }]}>{item.title}</Text>
              <Text style={[TextProps, { textAlign: "right", width: "60%", fontSize: 12, fontWeight: "600" }]}>
                {item.value}
              </Text>
            </View>
          );
        })}
      </View>
    </CustomCard>
  );
};

export default CostItem;

const styles = StyleSheet.create({
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
});
