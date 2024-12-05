import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const AmountList = ({ isLoading, debit, credit }) => {
  return !isLoading ? (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <View style={{ gap: 5, flex: 0.5 }}>
          <Text style={[TextProps]}>Debit</Text>
          <View style={styles.wrapper}>
            <Text style={[TextProps]}>{debit ? debit : "No Data"}</Text>
          </View>
        </View>
        <View style={{ gap: 5, flex: 0.5 }}>
          <Text style={[TextProps]}>Credit</Text>
          <View style={styles.wrapper}>
            <Text style={[TextProps]}>{credit ? credit : "No Data"}</Text>
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
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 10,
    padding: 10,
  },
});
