import { useEffect, useState } from "react";

import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
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
  text,
}) => {
  const [isLoading, setIsLoading] = useState(isSubmitting ? isSubmitting : false);

  const renderText = isLoading ? (
    <ActivityIndicator />
  ) : (
    <Text style={{ color: Colors.fontLight }}>{text}</Text>
  );

  const renderBorderWidth = variant === "dashed" || variant === "outline" ? 1 : 0;
  const renderOpacity = opacity ? opacity : disabled ? 0.5 : 1;

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
        borderTopLeftRadius: borderTopLeftRadius,
        borderTopRightRadius: borderTopRightRadius,
      }}
      disabled={disabled || isLoading}
      onPress={handlePress}
    >
      {renderText}
    </TouchableOpacity>
  );
};

export default FormButton;
