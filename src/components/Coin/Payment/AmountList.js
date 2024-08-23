import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const AmountList = ({ isLoading, total }) => {
  return !isLoading ? (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: "#E8E9EB",
        paddingTop: 10,
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <View style={{ gap: 5 }}>
        <Text style={[TextProps]}>Total</Text>
        <View style={styles.wrapper}>
          <Text style={[TextProps, { opacity: 0.5 }]}>{total ? total : "No Data"}</Text>
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
