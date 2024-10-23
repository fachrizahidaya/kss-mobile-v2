import { StyleSheet, Text, View } from "react-native";
import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const Item = ({ code, date, amount, isInvoice, index, length }) => {
  const dataArr = isInvoice
    ? [
        { title: "Transaction Date", value: date || "No Data" },
        { title: "Amount", value: amount || "No Data" },
      ]
    : [{ title: "Transaction Date", value: date || "No Data" }];

  return (
    <CustomCard gap={8} index={index} length={length}>
      <Text
        style={[TextProps, { overflow: "hidden", maxWidth: isInvoice ? 80 : null, fontWeight: "600", fontSize: 12 }]}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {`${code}`}
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
