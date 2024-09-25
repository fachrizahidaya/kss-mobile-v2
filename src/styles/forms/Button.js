import { TouchableOpacity } from "react-native";

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
    <TouchableOpacity
      style={{
        flex: flex,
        backgroundColor:
          variant === "outline" ? "white" : backgroundColor ? backgroundColor : disabled ? "gray" : "#176688",
        borderRadius: 10,
        height: height,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: variant === "dashed" || variant === "outline" ? 1 : 0,
        borderStyle: variant === "dashed" ? "dashed" : variant === "outline" ? "solid" : "solid",
        borderColor:
          variant === "dashed" || variant === "outline" ? "#E8E9EB" : backgroundColor ? backgroundColor : "white",
        padding: padding,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        alignSelf: alignSelf,
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
