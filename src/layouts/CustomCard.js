import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../styles/Color";

const CustomCard = ({
  backgroundColor,
  handlePress,
  children,
  index,
  length,
  gap,
  maxHeight,
  forBand,
}) => {
  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor ? backgroundColor : Colors.secondary,
          marginBottom: index === length - 1 ? 14 : null,
          gap: gap ? gap : null,
          maxHeight: maxHeight ? maxHeight : null,
          marginTop: forBand ? null : 14,
        },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
});
