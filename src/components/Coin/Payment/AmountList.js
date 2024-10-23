import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import CustomCard from "../../../layouts/CustomCard";

const AmountList = ({ isLoading, total }) => {
  const render = [{ title: "Total", value: total < 0 ? `(${Math.abs(balance)})` : total || "-" }];

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

const styles = StyleSheet.create({});
