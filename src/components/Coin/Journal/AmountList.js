import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const AmountList = ({ isLoading, debit, credit, currencyConverter, handleDynamicPadding }) => {
  const render = [
    { title: "Debit", value: debit < 0 ? `(${Math.abs(debit)})` : debit || "-" },
    { title: "Credit", value: credit < 0 ? `(${Math.abs(credit)})` : credit || "-" },
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
    paddingBottom: 30,
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
