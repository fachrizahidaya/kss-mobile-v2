import { Pressable, Text } from "react-native";

const LabelItem = ({ id, name, color, onPress, disabled }) => {
  return (
    <Pressable
      style={{ backgroundColor: color, padding: 8, borderRadius: 5 }}
      onPress={() => onPress(id)}
      disabled={disabled}
    >
      <Text style={{ color: "#FFFFFF" }}>{name}</Text>
    </Pressable>
  );
};

export default LabelItem;
