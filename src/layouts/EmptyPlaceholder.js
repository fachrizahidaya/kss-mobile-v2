import { StyleSheet, Text, View } from "react-native";
import { TextProps } from "../styles/CustomStylings";

const EmptyPlaceholder = ({ text, padding }) => {
  return (
    <View style={[styles.wrapper, { padding: padding }]}>
      <Text style={[TextProps]}>{text}</Text>
    </View>
  );
};

export default EmptyPlaceholder;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
