import { StyleSheet } from "react-native";
import Toast from "react-native-root-toast";
import { Colors } from "./Color";

const SkeletonCommonProps = {
  colorMode: "light",
  transition: {
    type: "timing",
    duration: 2000,
  },
  backgroundColor: "#D4D4D4",
};

const TextProps = StyleSheet.create({
  color: Colors.fontDark,
});

const ErrorToastProps = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.BOTTOM,
  animation: true,
  hideOnPress: true,
  shadow: false,
  backgroundColor: Colors.errorToast,
  textColor: Colors.fontLight,
  opacity: 1,
  delay: 0,
};

const SuccessToastProps = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.BOTTOM,
  animation: true,
  hideOnPress: true,
  shadow: false,
  backgroundColor: Colors.succesToast,
  textColor: Colors.fontLight,
  opacity: 1,
  delay: 0,
};

export { SkeletonCommonProps, TextProps, ErrorToastProps, SuccessToastProps };
