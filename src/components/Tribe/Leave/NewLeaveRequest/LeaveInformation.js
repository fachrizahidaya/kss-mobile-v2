import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const LeaveInformation = ({ leaveHistoryIsFetching, availableLeaves }) => {
  var render;

  if (leaveHistoryIsFetching) {
    render = (
      <View style={{ alignItems: "center", gap: 5 }}>
        <ActivityIndicator />
      </View>
    );
  } else if (!availableLeaves) {
    render = (
      <Text style={[TextProps, { fontSize: 14, fontWeight: "400" }]}>
        You don't have any leave quota
      </Text>
    );
  } else {
    render = availableLeaves?.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>{item.quota}</Text>
          <Text style={styles.name}>{item.leave_name}</Text>
        </View>
      );
    });
  }

  return <View style={styles.history}>{render}</View>;
};

export default LeaveInformation;

const styles = StyleSheet.create({
  history: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  name: {
    width: 100,
    height: 30,
    fontSize: 12,
    fontWeight: "400",
    color: Colors.fontGrey,
    textAlign: "center",
  },
});
