import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import styles from "./Overtime.styles";
import Tabs from "../../../layouts/Tabs";

const OvertimeSubmission = ({ tabs, tabValue, onChangeTab, onChangeNumber, number }) => {
  const [previousTabValue, setPreviousTabValue] = useState(0);

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const renderContent = () => {
    switch (tabValue) {
      case "Approved":
        return null;
      case "Canceled":
        return null;
      case "Rejected":
        return null;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (previousTabValue !== number) {
      const direction = previousTabValue < number ? -1 : 1;
      translateX.value = withTiming(
        direction * width,
        { duration: 300, easing: Easing.out(Easing.cubic) },
        () => {
          translateX.value = 0;
        }
      );
    }
    setPreviousTabValue(number);
  }, [number]);

  return (
    <>
      <View style={styles.tabContainer}>
        <Tabs
          tabs={tabs}
          value={tabValue}
          onChange={onChangeTab}
          onChangeNumber={onChangeNumber}
        />
      </View>
      <View style={styles.container}>
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
          {renderContent()}
        </Animated.View>
      </View>
    </>
  );
};

export default OvertimeSubmission;
