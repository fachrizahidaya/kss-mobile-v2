import { Pressable, TouchableOpacity } from "react-native";
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
}) => {
  return (
    <Pressable
      style={{
        flex: flex,
        backgroundColor: variant === "outline" ? Colors.secondary : backgroundColor ? backgroundColor : Colors.primary,
        borderRadius: 10,
        height: height,
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
        padding: padding || 10,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        alignSelf: alignSelf,
        borderTopRightRadius: borderTopRightRadius,
        borderTopLeftRadius: borderTopLeftRadius,
        opacity: disabled ? 0.5 : 1,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

export default Button;
