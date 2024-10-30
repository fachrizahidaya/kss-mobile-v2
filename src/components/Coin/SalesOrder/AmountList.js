import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const AmountList = ({ isLoading, discount, tax, sub_total, total_amount, handleDynamicPadding }) => {
  const render = [
    { title: "Sub Total", value: sub_total ? sub_total : "-" },
    { title: "Discount", value: discount ? discount : "-" },
    { title: "Tax", value: tax ? tax : "-" },
    { title: "Total Amount", value: total_amount ? total_amount : "-" },
  ];

  return !isLoading ? (
    <View
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        handleDynamicPadding(height);
      }}
      style={styles.amount}
    >
      {render.map((item, index) => {
        return (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { fontWeight: "700" }]}>{item.title}</Text>
            <Text style={[TextProps, { fontWeight: "500" }]}>{item.value}</Text>
          </View>
        );
      })}
    </View>
  ) : (
    <ActivityIndicator />
  );
};

export default AmountList;

const styles = StyleSheet.create({
  amount: {
    position: "absolute",
    paddingBottom: 50,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
    gap: 8,
  },
});
