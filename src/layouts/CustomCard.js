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
<<<<<<< HEAD
  const renderBackgroundColor = backgroundColor ? backgroundColor : Colors.secondary;
  const renderMarginBottom = index == length - 1 ? 14 : null;
  const renderGap = gap ? gap : null;
  const renderMaxHeight = maxHeight ? maxHeight : null;
  const renderMarginTop = forBand ? null : 14;

=======
>>>>>>> f2850a25 (fix: pending approval, add section task)
  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        {
<<<<<<< HEAD
          backgroundColor: renderBackgroundColor,
          marginBottom: renderMarginBottom,
          gap: renderGap,
          maxHeight: renderMaxHeight,
          marginTop: renderMarginTop,
=======
          backgroundColor: backgroundColor ? backgroundColor : Colors.secondary,
          marginBottom: index === length - 1 ? 14 : null,
          gap: gap ? gap : null,
          maxHeight: maxHeight ? maxHeight : null,
          marginTop: forBand ? null : 14,
>>>>>>> f2850a25 (fix: pending approval, add section task)
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
