import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const AmountList = ({ isLoading, total }) => {
  return !isLoading ? (
    <View style={{ gap: 5 }}>
      <Text style={[TextProps]}>Total</Text>
      <View style={styles.wrapper}>
        <Text style={[TextProps]}>{total ? total : "No Data"}</Text>
      </View>
    </View>
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
