import { ActivityIndicator, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const AmountList = ({ isLoading, discount, tax, sub_total, total_amount }) => {
  const render = [
    { title: "Sub Total", value: sub_total ? sub_total : "-" },
    { title: "Discount", value: discount ? discount : "-" },
    { title: "Tax", value: tax ? tax : "-" },
    { title: "Total Amount", value: total_amount ? total_amount : "-" },
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
