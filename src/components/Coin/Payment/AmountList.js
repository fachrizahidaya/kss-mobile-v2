import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const AmountList = ({ isLoading, total }) => {
  return !isLoading ? (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  wrapper: {
    // borderWidth: 1,
    // borderColor: "#E8E9EB",
    // borderRadius: 10,
    paddingVertical: 5,
  },
});
