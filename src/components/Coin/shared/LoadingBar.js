import { StyleSheet, Text, View } from "react-native";

const LoadingBar = ({ total, paid, unpaid, asToday }) => {
  const paidPercentage = (paid / total) * 100;
  const unpaidPercentage = (unpaid / total) * 100;

  return (
    <View style={{ gap: 5 }}>
      <View style={styles.loadingBar}>
        <View
          style={[styles.paidBar, { width: `${paidPercentage}%`, backgroundColor: asToday ? "#cba850" : "#36980e" }]}
        />
        <View
          style={[
            styles.unpaidBar,
            { width: `${unpaidPercentage}%`, backgroundColor: asToday ? "#cc4528" : "#cba850" },
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
