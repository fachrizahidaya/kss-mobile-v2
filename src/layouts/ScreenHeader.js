import { StyleSheet, Text, View } from "react-native";
import { TextProps } from "../styles/CustomStylings";
import { Colors } from "../styles/Color";

const ScreenHeader = ({ screenTitle, children, companyName }) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row" }}>
        <Text style={[TextProps, { fontSize: 16, fontWeight: "700", color: Colors.primary }]}>{screenTitle}</Text>
        {children}
      </View>
      <Text style={[{ fontWeight: "700" }, TextProps]}>{companyName}</Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
