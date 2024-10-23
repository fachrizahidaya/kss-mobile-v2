import { ActivityIndicator, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const AmountList = ({ isLoading, debit, credit, currencyConverter }) => {
  const render = [
    { title: "Debit", value: debit < 0 ? `(${Math.abs(debit)})` : debit || "-" },
    { title: "Credit", value: credit < 0 ? `(${Math.abs(credit)})` : credit || "-" },
  ];

  return !isLoading ? (
    <CustomCard gap={8}>
      {render.map((item, index) => {
        return (
          <View key={index} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { fontWeight: "700" }]}>{item.title}</Text>
            <Text style={[TextProps, { fontWeight: "500" }]}>{item.value}</Text>
          </View>
        );
      })}
    </CustomCard>
  ) : (
    <ActivityIndicator />
  );
};

export default AmountList;
