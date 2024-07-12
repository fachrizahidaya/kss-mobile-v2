import { TouchableOpacity } from "react-native";

const Button = ({
  children,
  styles,
  flex,
  backgroundColor,
  onPress,
  disabled,
  opacity,
  variant,
  padding,
  borderRadius,
  height,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles,
        {
          flex: flex,
          backgroundColor:
            variant === "outline" ? "white" : backgroundColor ? backgroundColor : disabled ? "gray" : "#176688",
          opacity: opacity || 1,
          borderRadius: borderRadius ? borderRadius : 10,
          height: height ? height : 42,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: variant === "dashed" || variant === "outline" ? 1 : 0,
          borderStyle: variant === "dashed" ? "dashed" : variant === "outline" ? "solid" : "solid",
          borderColor:
            variant === "dashed" || variant === "outline" ? "#E8E9EB" : backgroundColor ? backgroundColor : "white",
          padding: padding ? padding : null,
        },
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;
