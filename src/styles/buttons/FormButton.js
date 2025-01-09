import { useEffect, useState } from "react";

import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Colors } from "../Color";

const FormButton = ({
  children,
  isSubmitting,
  onPress,
  setLoadingIndicator,
  flex,
  backgroundColor,
  disabled,
  opacity,
  variant,
  borderRadius,
  padding,
  height,
  width,
  transform,
  paddingHorizontal,
  paddingVertical,
  borderTopRightRadius,
  borderTopLeftRadius,
  alignSelf,
}) => {
  const [isLoading, setIsLoading] = useState(isSubmitting ? isSubmitting : false);

  const handlePress = () => {
    if (isSubmitting !== undefined) {
      onPress();
    } else {
      setIsLoading(true);
      onPress(setIsLoading);
    }
  };

  // Update the loading state when the 'isSubmitting' prop changes
  useEffect(() => {
    if (isSubmitting !== undefined) {
      setIsLoading(isSubmitting);
    }
  }, [isSubmitting]);

  // Notify parent component about loading state (if setLoadingIndicator is provided)
  useEffect(() => {
    setLoadingIndicator && setLoadingIndicator(isLoading);
  }, [isLoading]);

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
        borderTopLeftRadius: borderTopLeftRadius,
        borderTopRightRadius: borderTopRightRadius,
      }}
      disabled={disabled || isLoading}
      onPress={handlePress}
    >
      {isLoading ? <ActivityIndicator /> : children}
    </TouchableOpacity>
  );
};

export default FormButton;
