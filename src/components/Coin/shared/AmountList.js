import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const AmountList = ({ isLoading, discount, tax, sub_total, total_amount }) => {
  return !isLoading ? (
    <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { fontWeight: "700" }]}>Sub Total</Text>
          <Text style={[TextProps, { fontWeight: "500" }]}>{sub_total ? sub_total : "No Data"}</Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 }}
        >
          <View style={{ gap: 5 }}>
            <Text style={[TextProps, { fontWeight: "700" }]}>Discount</Text>
            <Text style={[TextProps, { fontWeight: "500" }]}>{discount ? discount : "No Data"}</Text>
          </View>
          <View style={{ gap: 5 }}>
            <Text style={[TextProps, { fontWeight: "700" }]}>Tax</Text>
            <Text style={[TextProps, { fontWeight: "500" }]}>{tax ? tax : "No Data"}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { fontWeight: "700" }]}>Total Amount</Text>
          <Text style={[TextProps, { fontWeight: "500" }]}>{total_amount ? total_amount : "No Data"}</Text>
        </View>
      </View>
    </View>
  ) : (
    <ActivityIndicator />
  );
};

export default AmountList;

const styles = StyleSheet.create({
  wrapper: {
    // borderWidth: 1,
    // borderColor: "#E8E9EB",
    // borderRadius: 10,
    paddingVertical: 5,
  },
});
