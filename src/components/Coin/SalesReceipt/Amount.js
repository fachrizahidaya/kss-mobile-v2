import { ActivityIndicator, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";

const Amount = ({ payment, paid, discount, over, isLoading }) => {
  const render = [
    { title: "Payment Amount", value: payment ? payment : "-" },
    { title: "Invoice Paid", value: paid ? paid : "-" },
    { title: "Total Discount", value: discount ? discount : "-" },
    { title: "Over Payment", value: over ? over : "-" },
  ];

  return !isLoading ? (
    <View style={[card.card, { gap: 10 }]}>
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
