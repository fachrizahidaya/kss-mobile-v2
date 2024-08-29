import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";

const AmountList = ({ isLoading, debit, credit }) => {
  return !isLoading ? (
    <View style={[card.card, { gap: 10 }]}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[TextProps, { fontWeight: "700" }]}>Debit</Text>
        <View>
          <Text style={[TextProps, { fontWeight: "500" }]}>{debit ? debit : "No Data"}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[TextProps, { fontWeight: "700" }]}>Credit</Text>
        <Text style={[TextProps, { fontWeight: "500" }]}>{credit ? credit : "No Data"}</Text>
      </View>
    </View>
  ) : (
    <ActivityIndicator />
  );
};

export default AmountList;

const styles = StyleSheet.create({});
