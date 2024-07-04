import { View, Pressable, Text, StyleSheet } from "react-native";
import { TextProps } from "../../shared/CustomStylings";

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
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
});
