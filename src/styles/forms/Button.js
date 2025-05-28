import { TouchableOpacity } from "react-native";
import { Colors } from "../Color";

const Button = ({
  children,
  flex,
  backgroundColor,
  onPress,
  disabled,
  variant,
  padding,
  height,
  paddingVertical,
  paddingHorizontal,
  alignSelf,
  borderTopRightRadius,
  borderTopLeftRadius,
  borderRadius,
  width,
  transform,
  opacity,
}) => {
  const renderOpacity = opacity ? opacity : disabled ? 0.5 : 1;
  const renderBorderWidth = variant === "dashed" || variant === "outline" ? 1 : 0;

  var renderBackground;

  if (variant === "outline") {
    renderBackground = Colors.secondary;
  } else if (backgroundColor) {
    renderBackground = backgroundColor;
  } else {
    renderBackground = Colors.primary;
  }

  var borderStyle;

  if (variant === "dashed") {
    borderStyle === "dashed";
  } else if (variant === "outline") {
    borderStyle = "solid";
  } else {
    borderStyle = "solid";
  }

  var borderColor;

  if (variant === "dashed" || variant === "outline") {
    borderColor === Colors.borderGrey;
  } else if (backgroundColor) {
    borderColor = backgroundColor;
  } else {
    borderColor = Colors.borderWhite;
  }

  return (
    <TouchableOpacity
      style={{
        flex: flex,
        backgroundColor: renderBackground,
        opacity: renderOpacity,
        borderRadius: borderRadius || 10,
        height: height,
        width: width,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: renderBorderWidth,
        borderStyle: borderStyle,
        borderColor: borderColor,
        padding: padding,
        paddingVertical: paddingVertical || 8,
        paddingHorizontal: paddingHorizontal || 10,
        alignSelf: alignSelf,
        transform: transform,
        borderTopRightRadius: borderTopRightRadius,
        borderTopLeftRadius: borderTopLeftRadius,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;
