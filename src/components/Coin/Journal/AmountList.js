import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const AmountList = ({ isLoading, debit, credit }) => {
  return !isLoading ? (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps]}>Debit</Text>
          <View style={styles.wrapper}>
            <Text style={[TextProps, { opacity: 0.5 }]}>{debit ? debit : "No Data"}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps]}>Credit</Text>
          <View style={styles.wrapper}>
            <Text style={[TextProps, { opacity: 0.5 }]}>{credit ? credit : "No Data"}</Text>
          </View>
        </View>
      </View>
    </>
  ) : (
    <ActivityIndicator />
  );
};

export default AmountList;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopColor: "#E8E9EB",
  },
  wrapper: {
    // borderWidth: 1,
    // borderColor: "#E8E9EB",
    // borderRadius: 10,
    paddingVertical: 5,
  },
});
