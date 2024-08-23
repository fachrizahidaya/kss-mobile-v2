import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const AmountList = ({ isLoading, debit, credit }) => {
  return !isLoading ? (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 10,
          borderTopWidth: 1,
          paddingTop: 10,
          borderTopColor: "#E8E9EB",
        }}
      >
        <View style={{ gap: 10, flex: 0.4 }}>
          <Text style={[TextProps]}>Debit</Text>
          <View style={styles.wrapper}>
            <Text style={[TextProps, { opacity: 0.5 }]}>{debit ? debit : "No Data"}</Text>
          </View>
        </View>
        <View style={{ gap: 10 }}>
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
  wrapper: {
    // borderWidth: 1,
    // borderColor: "#E8E9EB",
    // borderRadius: 10,
    paddingVertical: 5,
  },
});
