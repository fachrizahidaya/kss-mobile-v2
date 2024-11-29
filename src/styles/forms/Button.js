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
  return (
    <TouchableOpacity
      style={{
        flex: flex,
        backgroundColor: variant === "outline" ? Colors.secondary : backgroundColor ? backgroundColor : Colors.primary,
        opacity: opacity ? opacity : disabled ? 0.5 : 1,
        borderRadius: borderRadius || 10,
        height: height,
        width: width,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: variant === "dashed" || variant === "outline" ? 1 : 0,
        borderStyle: variant === "dashed" ? "dashed" : variant === "outline" ? "solid" : "solid",
        borderColor:
          variant === "dashed" || variant === "outline"
            ? Colors.borderGrey
            : backgroundColor
            ? backgroundColor
            : Colors.borderWhite,
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
