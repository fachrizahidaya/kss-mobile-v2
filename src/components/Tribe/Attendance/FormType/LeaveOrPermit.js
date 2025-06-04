import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const LeaveOrPermit = ({ type, reason }) => {
  return (
    <View style={{ gap: 10 }}>
      <View style={{ gap: 10 }}>
        <Text style={[{ fontSize: 14 }, TextProps]}>Attendance Type</Text>
        <View style={styles.content}>
          <Text style={[{ fontSize: 14 }, TextProps]}>{type}</Text>
        </View>
      </View>
      {type === "Leave" ? null : (
        <View style={{ gap: 10 }}>
          <Text style={[{ fontSize: 14 }, TextProps]}>Reason</Text>
          <View style={styles.content}>
            <Text style={[{ fontSize: 14 }, TextProps]}>{reason}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default LeaveOrPermit;

const styles = StyleSheet.create({
  content: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.borderGrey,
  },
});
