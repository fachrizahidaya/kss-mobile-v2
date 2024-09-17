import { useEffect, useState } from "react";

import { ActivityIndicator, TouchableOpacity } from "react-native";

const FormButton = ({
  children,
  backgroundColor,
  isSubmitting,
  onPress,
  disabled,
  setLoadingIndicator,
  opacity,
  variant,
  borderRadius,
  padding,
  height,
  width,
  transform,
  paddingHorizontal,
  paddingVertical,
}) => {
  const [isLoading, setIsLoading] = useState(isSubmitting ? isSubmitting : false);

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
        backgroundColor: backgroundColor ? backgroundColor : disabled || isLoading ? "gray" : "#176688",
        opacity: opacity || 1,
        borderRadius: borderRadius || 10,
        height: height,
        width: width,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: variant === "dashed" || variant === "outline" ? 1 : 0,
        borderStyle: variant === "dashed" ? "dashed" : "solid",
        borderColor: variant === "dashed" || variant === "outline" ? "#E8E9EB" : "#FFFFFF",
        padding: padding,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        transform: transform,
      }}
      disabled={disabled || isLoading}
      onPress={() => {
        if (isSubmitting !== undefined) {
          onPress();
        } else {
          setIsLoading(true);
          onPress(setIsLoading);
        }
      }}
    >
      {isLoading ? <ActivityIndicator /> : children}
    </TouchableOpacity>
  );
};

export default FormButton;
