import { StyleSheet, Text, View } from "react-native";
import { TextProps } from "./CustomStylings";
import { Colors } from "./Color";

const CustomBadge = ({ description, backgroundColor, textColor, children }) => {
  return (
    <View style={[styles.status, { backgroundColor: backgroundColor }]}>
      {(
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
            TextProps,
            {
              color: textColor ? textColor : Colors.fontDark,
              fontSize: 10,
              maxWidth: 80,
            },
          ]}
        >
          {description}
        </Text>
      ) || children}
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
