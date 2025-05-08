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
  const renderBackgroundColor = backgroundColor ? backgroundColor : Colors.secondary;
  const renderMarginBottom = index == length - 1 ? 14 : null;
  const renderGap = gap ? gap : null;
  const renderMaxHeight = maxHeight ? maxHeight : null;
  const renderMarginTop = forBand ? null : 14;

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: renderBackgroundColor,
          marginBottom: renderMarginBottom,
          gap: renderGap,
          maxHeight: renderMaxHeight,
          marginTop: renderMarginTop,
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
