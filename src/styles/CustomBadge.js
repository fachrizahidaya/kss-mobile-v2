import { StyleSheet, Text, View } from "react-native";
import { TextProps } from "./CustomStylings";

const CustomBadge = ({ description, backgroundColor, textColor, children }) => {
  return (
    <View style={[styles.status, { backgroundColor: backgroundColor }]}>
      {<Text style={[TextProps, { color: textColor ? textColor : "#3F434A", fontSize: 10 }]}>{description}</Text> ||
        children}
    </View>
  );
};

export default CustomBadge;

const styles = StyleSheet.create({
  status: {
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
