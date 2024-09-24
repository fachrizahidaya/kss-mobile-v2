import { StyleSheet, Text, View } from "react-native";
import { TextProps } from "../styles/CustomStylings";

const ScreenHeader = ({ screenTitle, children, companyName }) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row" }}>
        <Text style={[TextProps, { fontSize: 16, fontWeight: "700", color: "#377893" }]}>{screenTitle}</Text>
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
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
