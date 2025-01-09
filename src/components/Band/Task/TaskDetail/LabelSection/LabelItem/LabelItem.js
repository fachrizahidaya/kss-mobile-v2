import { Pressable, Text } from "react-native";
import { Colors } from "../../../../../../styles/Color";

const LabelItem = ({ id, name, color, onPress, disabled }) => {
  const handlePress = () => onPress(id);

  return (
    <Pressable
      style={{ backgroundColor: color, padding: 8, borderRadius: 5 }}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={{ color: Colors.fontLight }}>{name}</Text>
    </Pressable>
  );
};

export default LabelItem;
