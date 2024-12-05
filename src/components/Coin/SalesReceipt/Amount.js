import { ActivityIndicator, Text, View, StyleSheet } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const Amount = ({ payment, paid, discount, over, isLoading, currencyConverter, handleDynamicPadding }) => {
  const render = [
    { title: "Payment Amount", value: payment ? payment : "-" },
    { title: "Invoice Paid", value: paid ? paid : "-" },
    { title: "Total Discount", value: discount ? discount : "-" },
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

export default Amount;

const styles = StyleSheet.create({
  amount: {
    position: "absolute",
    paddingBottom: 50,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: Colors.secondary,
    borderTopWidth: 1,
    borderColor: "#ccc",
    gap: 8,
  },
});
