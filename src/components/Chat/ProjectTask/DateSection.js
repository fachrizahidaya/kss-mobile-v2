import { View, Pressable, Text, StyleSheet } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const DateSection = ({ start, end }) => {
  return (
    <Pressable style={styles.container}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={[{ fontSize: 12 }, TextProps]}>Start</Text>
        <Text style={{ fontSize: 12, fontWeight: "500" }}>{start}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={[{ fontSize: 12 }, TextProps]}>Due</Text>
        <Text style={{ fontSize: 12, fontWeight: "500" }}>{end}</Text>
      </View>
    </Pressable>
  );
};

export default DateSection;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 10,
  },
});
