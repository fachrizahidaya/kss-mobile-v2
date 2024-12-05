import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../styles/Color";

const LoadingBar = ({ total, paid, unpaid, asToday }) => {
  const paidPercentage = (paid / total) * 100;
  const unpaidPercentage = (unpaid / total) * 100;

  return (
    <View style={{ gap: 5 }}>
      <View style={styles.loadingBar}>
        <View
          style={[
            styles.paidBar,
            {
              width: `${paidPercentage === 0 ? 100 : paidPercentage}%`,
              backgroundColor: paidPercentage === 0 ? Colors.borderGrey : asToday ? "#FDC500" : "#3BC14A",
            },
          ]}
        />
        <View
          style={[
            styles.unpaidBar,
            {
              width: `${unpaidPercentage === 0 ? 100 : unpaidPercentage}%`,
              backgroundColor: unpaidPercentage === 0 ? Colors.borderGrey : asToday ? "#DD4D64" : "#FDC500",
            },
          ]}
        />
      </View>
    </View>
  );
};

export default LoadingBar;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: "center",
  },
  loadingBar: {
    flexDirection: "row",
    width: "100%",
    height: 15,
    borderRadius: 5,
    overflow: "hidden",
  },
  paidBar: {
    height: "100%",
  },
  unpaidBar: {
    height: "100%",
  },
});
