import { useState } from "react";
import dayjs from "dayjs";

import { View, Text, Platform, ActivityIndicator, Dimensions, StyleSheet, Pressable } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
  withTiming,
  runOnJS,
  useDerivedValue,
  interpolateColor,
} from "react-native-reanimated";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);
const AnimatedText = Animated.createAnimatedComponent(Text);

const ClockAttendance = ({
  attendance,
  onClock,
  location,
  locationOn,
  modalIsOpen,
  workDuration,
  timeIn,
  reference,
  shiftValue,
}) => {
  const [shift, setShift] = useState(false);

  const translateX = useSharedValue(0);
  const screenWidth = Dimensions.get("screen");

  let minimumTranslation = 0;

  if (Platform.OS === "ios") {
    minimumTranslation = screenWidth.width - 130;
  } else if (Platform.OS === "android") {
    minimumTranslation = screenWidth.width - 130;
  } else {
    minimumTranslation = screenWidth.width;
  }

  const MIN_TRANSLATE_X = screenWidth.width - minimumTranslation;

  /**
   * Handle animation for slide button
   */
  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      // while slide the button
      if (event.translationX > 0) {
        translateX.value = Math.min(event.translationX, screenWidth.width - MIN_TRANSLATE_X);
      }
    },
    onEnd: (event) => {
      // when finished the slide
      if (event.translationX > 0) {
        if (translateX.value > MIN_TRANSLATE_X) {
          runOnJS(onClock)();
        }
      }
      translateX.value = withTiming(0);
    },
  });

  const limitedTranslateX = useDerivedValue(() => Math.max(translateX.value, 0));

  /**
   * Handle animation for background
   */
  const rContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      limitedTranslateX.value,
      [0, screenWidth.width - MIN_TRANSLATE_X],
      ["#87878721", Colors.primary]
    );
    return {
      transform: [],
      backgroundColor: modalIsOpen ? Colors.primary : backgroundColor,
    };
  });

  /**
   * Handle animation for button
   */
  const rTaskContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      limitedTranslateX.value,
      [0, screenWidth.width - MIN_TRANSLATE_X],
      [Colors.primary, Colors.fontLight]
    );
    return {
      transform: [
        {
          translateX: limitedTranslateX.value,
        },
      ],
      backgroundColor: modalIsOpen ? Colors.fontLight : backgroundColor,
    };
  });

  /**
   * Handle animation for text color
   */
  const textContainerStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      limitedTranslateX.value,
      [0, screenWidth.width - MIN_TRANSLATE_X],
      [Colors.primary, Colors.fontLight]
    );
    return {
      color: modalIsOpen ? Colors.fontLight : textColor,
    };
  });

  return (
    <View style={{ gap: 20 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[TextProps, { color: Colors.primary, fontSize: 12 }]}>
            {dayjs().format("DD MMM YYYY HH:mm")}
          </Text>
        </View>
        {shift ? (
          <Pressable style={styles.contentShift} onPress={() => reference.current?.show()}>
            {!shiftValue ? (
              <Text style={[TextProps, { fontSize: 12 }]}>{shiftValue}</Text>
            ) : (
              <>
                <Text style={[TextProps, { fontSize: 12 }]}>Select shift</Text>
                <MaterialCommunityIcons name="chevron-down" color={Colors.iconDark} />
              </>
            )}
          </Pressable>
        ) : (
          <View style={styles.content}>
            <Text style={[TextProps, { color: Colors.primary, fontSize: 12 }]}>
              Duration: {workDuration && timeIn ? workDuration : "-:-"}
            </Text>
          </View>
        )}
      </View>
      {!shift ? (
        <>
          <View style={styles.container}>
            <View style={[styles.clockData, { backgroundColor: attendance?.late ? "#feedaf" : "#daecfc" }]}>
              <Text style={{ color: attendance?.late ? "#fdc500" : Colors.primary }}>Clock-in</Text>
              <Text
                style={{ fontWeight: "500", color: attendance?.late ? "#fdc500" : Colors.primary, textAlign: "center" }}
              >
                {attendance?.time_in ? dayjs(attendance?.time_in).format("HH:mm") || attendance?.time_in : "-:-"}
              </Text>
            </View>
            <View style={[styles.clockData, { backgroundColor: attendance?.early ? "#feedaf" : "#daecfc" }]}>
              <Text style={{ color: attendance?.early ? "#fdc500" : Colors.primary }}>Clock-out</Text>
              <Text
                style={{
                  fontWeight: "500",
                  color: attendance?.early ? "#fdc500" : Colors.primary,
                  textAlign: "center",
                }}
              >
                {attendance?.time_out ? dayjs(attendance?.time_out).format("HH:mm") || attendance?.time_out : "-:-"}
              </Text>
            </View>
          </View>
          <Animated.View
            style={[
              styles.slideTrack,
              { backgroundColor: modalIsOpen ? Colors.primary : "#87878721" },
              rContainerStyle,
            ]}
          >
            <PanGestureHandler onGestureEvent={panGesture}>
              <Animated.View
                style={[
                  rTaskContainerStyle,
                  styles.slideArrow,
                  { backgroundColor: modalIsOpen ? Colors.secondary : Colors.primary },
                ]}
              >
                <AnimatedIcon name="chevron-right" size={50} color={modalIsOpen ? Colors.primary : Colors.iconLight} />
              </Animated.View>
            </PanGestureHandler>

            <View style={[styles.slideWording, { width: "100%" }]}>
              {modalIsOpen ? (
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <ActivityIndicator color={Colors.iconLight} />
                  <Text style={{ color: Colors.fontLight, fontSize: 16, fontWeight: "500" }}>Processing</Text>
                </View>
              ) : (
                <AnimatedText
                  style={[
                    textContainerStyle,
                    { fontSize: 16, fontWeight: "500", color: !modalIsOpen ? Colors.fontLight : Colors.primary },
                  ]}
                >
                  {(modalIsOpen && !location) || (modalIsOpen && !locationOn)
                    ? `${!attendance?.time_out ? "Clock-in" : "Clock-out"} failed!`
                    : `Slide to ${!attendance?.time_in ? "Clock-in" : "Clock-out"}`}
                </AnimatedText>
              )}
            </View>
          </Animated.View>
        </>
      ) : null}
    </View>
  );
};

export default ClockAttendance;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 1,
  },
  clockData: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    width: "40%",
  },
  slideArrow: {
    zIndex: 3,
    borderRadius: 50,
    padding: 6,
    position: "absolute",
    marginLeft: 10,
  },
  slideTrack: {
    borderRadius: 60,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  slideWording: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 50,
    zIndex: 0,
  },
  content: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#87878721",
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentShift: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
