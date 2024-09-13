import { Text, View } from "react-native";
import { TextProps } from "./CustomStylings";

const EmptyPlaceholder = ({ text, padding }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1, padding: padding }}>
      <Text style={[TextProps]}>{text}</Text>
    </View>
  );
};

export default EmptyPlaceholder;
