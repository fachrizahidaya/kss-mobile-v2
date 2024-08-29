import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";

const AmountList = ({ isLoading, total }) => {
  return !isLoading ? (
    <View style={[card.card, { gap: 10 }]}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[TextProps, { fontWeight: "700" }]}>Total</Text>
        <View>
          <Text style={[TextProps, { fontWeight: "500" }]}>{total ? total : "No Data"}</Text>
        </View>
      </View>
    </View>
  ) : (
    <ActivityIndicator />
  );
};

export default AmountList;

const styles = StyleSheet.create({});
