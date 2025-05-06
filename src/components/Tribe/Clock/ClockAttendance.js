import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
<<<<<<< HEAD
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
=======
>>>>>>> 000b5e7c (feat: attendance location and selfie)

<<<<<<< HEAD
import {
  View,
  Text,
  Platform,
  Dimensions,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PanGestureHandler } from "react-native-gesture-handler";
=======
import { View, Text, Platform, Dimensions, StyleSheet, Pressable } from "react-native";
>>>>>>> 9d6a7cd4 (fix: dashboard tribe, coin)

import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";
import Select from "../../../styles/forms/Select";

<<<<<<< HEAD
<<<<<<< HEAD
const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);
const AnimatedText = Animated.createAnimatedComponent(Text);

=======
>>>>>>> 3a5fb5d5 (fix: location status)
const ClockAttendance = ({
  attendance,
  clockIn,
  mainSheetRef,
  startTime,
  endTime,
  location,
<<<<<<< HEAD
<<<<<<< HEAD
  locationOn,
  locationPermission,
  type,
  onClock,
  minimumDurationReached,
  modalIsOpen,
  shiftValue,
  shifts,
  handleChange,
  toggleClockModal,
  setRequestType,
  setErrorMessage,
  result,
  workDuration,
  setResult,
  timeIn,
  reference,
  shiftValue,
  minimumDurationReached,
  clockIn,
  mainSheetRef,
  startTime,
  endTime,
=======
  locationOn,
  locationPermission,
  type,
>>>>>>> ba143aea (fix: attendance map location, qr generate)
}) => {
  const [shift, setShift] = useState(false);
  const [slide, setSlide] = useState(false);

  const translateX = useSharedValue(0);
=======
const ClockAttendance = ({ attendance, clockIn, mainSheetRef, startTime, endTime }) => {
>>>>>>> 9d6a7cd4 (fix: dashboard tribe, coin)
=======
}) => {
>>>>>>> 3a5fb5d5 (fix: location status)
  const screenWidth = Dimensions.get("screen");
  const navigation = useNavigation();

  let minimumTranslation = 0;

  if (Platform.OS === "ios") {
    minimumTranslation = screenWidth.width - 130;
  } else if (Platform.OS === "android") {
    minimumTranslation = screenWidth.width - 130;
  } else {
    minimumTranslation = screenWidth.width;
  }

<<<<<<< HEAD
  const MIN_TRANSLATE_X = screenWidth.width - minimumTranslation;

  /**
   * Handle animation for slide button
   */
  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      // while slide the button
      if (event.translationX > 0) {
        translateX.value = Math.min(
          event.translationX,
          screenWidth.width - MIN_TRANSLATE_X,
        );
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
    let backgroundColor;
    if (!location) {
      backgroundColor = "#FF7F7F"; // Red when location is null
    } else if (clockIn && !minimumDurationReached) {
      backgroundColor = "#FF7F7F";
    } else {
      backgroundColor = interpolateColor(
        limitedTranslateX.value,
        [0, screenWidth.width - MIN_TRANSLATE_X],
        ["#87878721", Colors.primary, "#FF7F7F"],
      );
    }

    return {
      transform: [],
      backgroundColor: modalIsOpen ? Colors.primary : backgroundColor,
    };
  });

  /**
   * Handle animation for button
   */
  const rTaskContainerStyle = useAnimatedStyle(() => {
    let backgroundColor;
    if (!location) {
      backgroundColor = Colors.danger;
    } else if (clockIn && !minimumDurationReached) {
      backgroundColor = Colors.danger;
    } else {
      backgroundColor = interpolateColor(
        limitedTranslateX.value,
        [0, screenWidth.width - MIN_TRANSLATE_X],
        [Colors.primary, Colors.fontLight, Colors.danger],
      );
    }
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
    let textColor;
    if (clockIn && !minimumDurationReached) {
      textColor = Colors.fontLight;
    } else {
      textColor = interpolateColor(
        limitedTranslateX.value,
        [0, screenWidth.width - MIN_TRANSLATE_X],
        [Colors.primary, Colors.fontLight],
      );
    }
    return {
      color: modalIsOpen ? Colors.fontLight : textColor,
    };
  });

<<<<<<< HEAD
  var renderBackgroundSlideTrack;

  if (location === null) {
    renderBackgroundSlideTrack = "#FF7F7F";
  } else if (modalIsOpen) {
    renderBackgroundSlideTrack = Colors.primary;
  } else {
    renderBackgroundSlideTrack = "#87878721";
  }

  var renderBackgroundSlideArrow;

  if (clockIn && !minimumDurationReached) {
    renderBackgroundSlideArrow = Colors.danger;
  } else if (modalIsOpen) {
    renderBackgroundSlideArrow = Colors.secondary;
  } else {
    renderBackgroundSlideArrow = Colors.primary;
  }

  var renderColorSlideText;

  if (clockIn && !minimumDurationReached) {
    renderColorSlideText = Colors.fontLight;
  } else if (!modalIsOpen) {
    renderColorSlideText = Colors.fontLight;
  } else {
    renderColorSlideText = Colors.primary;
  }

  var renderSlideText;

  if (location === null) {
    renderSlideText = null;
  } else if ((modalIsOpen && !location) || (modalIsOpen && !locationOn)) {
    renderSlideText = `${!attendance?.time_out ? "Clock-in" : "Clock-out"} failed!`;
  } else {
    renderSlideText = `Slide to ${!attendance?.time_in ? "Clock-in" : "Clock-out"}`;
  }

<<<<<<< HEAD
  const handleToClock = () => {
    navigation.navigate(type, {
      location: location,
      locationOn: locationOn,
      locationPermission: locationPermission,
      toggleClockSuccess: toggleClockModal,
      setRequestType: setRequestType,
      setErrorMessage: setErrorMessage,
      attendance: attendance,
      result: result,
      minimumDurationReached: minimumDurationReached,
      workDuration: workDuration,
      setResult: setResult,
    });
    mainSheetRef.current?.hide();
  };

=======
>>>>>>> 5ff79603 (fix:)
=======
=======
>>>>>>> 9d6a7cd4 (fix: dashboard tribe, coin)
  const handleToClock = () => {
    navigation.navigate(type, {
      location: location,
      locationOn: locationOn,
      locationPermission: locationPermission,
    });
    mainSheetRef.current?.hide();
  };

>>>>>>> 000b5e7c (feat: attendance location and selfie)
  return (
    <View
      style={{
        // gap: 10,
        gap: 20,
      }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[TextProps, { color: Colors.primary, fontSize: 12 }]}>
            {`${dayjs().format("DD MMM YYYY")} (${startTime}-${endTime})`}
          </Text>
        </View>
<<<<<<< HEAD
<<<<<<< HEAD
        {/* {shift ? (
          <Pressable
            style={styles.contentShift}
            onPress={() => reference.current?.show()}
          >
            {!shiftValue ? (
              <Text style={[TextProps, { fontSize: 12 }]}>{shiftValue?.label}</Text>
            ) : (
              <>
                <Text style={[TextProps, { fontSize: 12 }]}>Select shift</Text>
                <MaterialCommunityIcons name="chevron-down" color={Colors.iconDark} />
              </>
            )}
          </Pressable>
        ) : (
          <View style={styles.content}>
=======

        {/* <View style={styles.content}>
>>>>>>> bfa7e57c (fix: map)
            <Text style={[TextProps, { color: Colors.primary, fontSize: 12 }]}>
              Duration: {workDuration && timeIn ? workDuration : "-:-"}
            </Text>
          </View> */}
=======
>>>>>>> ba143aea (fix: attendance map location, qr generate)
      </View>
<<<<<<< HEAD
      {!shift && (
        <>
          <View style={styles.container}>
            <Pressable
              style={[
                styles.clockData,
                { backgroundColor: attendance?.late ? "#feedaf" : "#daecfc" },
              ]}
              onPress={handleToClock}
            >
              <Text style={{ color: attendance?.late ? "#fdc500" : Colors.primary }}>
                Clock-in
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  color: attendance?.late ? "#fdc500" : Colors.primary,
                  textAlign: "center",
                }}
              >
                {attendance?.time_in ? attendance?.time_in || attendance?.time_in : "-:-"}
              </Text>
            </Pressable>
            <View
              style={[
                styles.clockData,
                { backgroundColor: attendance?.early ? "#feedaf" : "#daecfc" },
              ]}
            >
              <Text style={{ color: attendance?.early ? "#fdc500" : Colors.primary }}>
                Clock-out
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  color: attendance?.early ? "#fdc500" : Colors.primary,
                  textAlign: "center",
                }}
              >
                {attendance?.time_out ? attendance?.time_out : "-:-"}
              </Text>
            </View>
          </View>
          <Animated.View
            style={[
              styles.slideTrack,
<<<<<<< HEAD
              {
                backgroundColor:
                  location === null
                    ? "#FF7F7F"
                    : modalIsOpen
                      ? Colors.primary
                      : "#87878721",
              },
=======
              { backgroundColor: renderBackgroundSlideTrack },
>>>>>>> 5ff79603 (fix:)
              rContainerStyle,
            ]}
          >
            {location === null || !locationOn ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{ color: Colors.fontLight, fontSize: 16, fontWeight: "500" }}
                >
                  Location not found
                </Text>
              </View>
            ) : (
              <PanGestureHandler onGestureEvent={panGesture}>
                <Animated.View
                  style={[
                    rTaskContainerStyle,
                    styles.slideArrow,
<<<<<<< HEAD
                    {
                      backgroundColor:
                        clockIn && !minimumDurationReached
                          ? Colors.danger
                          : modalIsOpen
                            ? Colors.secondary
                            : Colors.primary,
                    },
=======
                    { backgroundColor: renderBackgroundSlideArrow },
>>>>>>> 5ff79603 (fix:)
                  ]}
                >
                  <AnimatedIcon
                    name="chevron-right"
                    size={50}
                    color={modalIsOpen ? Colors.primary : Colors.iconLight}
                  />
                </Animated.View>
              </PanGestureHandler>
            )}

            <View style={[styles.slideWording, { width: "100%" }]}>
              {modalIsOpen ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <ActivityIndicator color={Colors.iconLight} />
                  <Text
                    style={{ color: Colors.fontLight, fontSize: 16, fontWeight: "500" }}
                  >
                    Processing
                  </Text>
                </View>
              ) : (
                <AnimatedText
                  style={[
                    textContainerStyle,
<<<<<<< HEAD
                    {
                      fontSize: 16,
                      fontWeight: "500",
                      color:
                        clockIn && !minimumDurationReached
                          ? Colors.fontLight
                          : !modalIsOpen
                            ? Colors.fontLight
                            : Colors.primary,
                    },
                  ]}
                >
                  {location === null
                    ? null
                    : (modalIsOpen && !location) || (modalIsOpen && !locationOn)
<<<<<<< HEAD
<<<<<<< HEAD
                      ? `${!attendance?.time_out ? "Clock-in" : "Clock-out"} failed!`
                      : `Slide to ${!attendance?.time_in ? "Clock-in" : "Clock-out"}`}
=======
                    ? `${!attendance?.time_out ? "Clock-in" : "Clock-out"} failed!`
                    : `Slide to ${!attendance?.time_in ? "Clock-in" : "Clock-out"}`}
>>>>>>> ab148f65 (fix: reason modal if not late)
=======
                    { fontSize: 16, fontWeight: "500", color: renderColorSlideText },
                  ]}
                >
                  {renderSlideText}
>>>>>>> 5ff79603 (fix:)
=======
                    ? `${!attendance?.time_out ? "Clock-in" : "Clock-out"} failed!`
                    : `Slide to ${!attendance?.time_in ? "Clock-in" : "Clock-out"}`}
>>>>>>> 000b5e7c (feat: attendance location and selfie)
                </AnimatedText>
              )}
            </View>
          </Animated.View>
        </>
      )}
      {/* <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[TextProps, { color: Colors.primary, fontSize: 12 }]}>
            {`${dayjs().format("DD MMM YYYY")} (${startTime}-${endTime})`}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        {!shift && (
          <Select
            title={null}
            items={shifts}
            placeHolder="Select shift"
            fieldName="shift"
            value={shiftValue}
            onChange={handleChange}
          />
        )}
      </View> */}

      {/* <>
        <View style={styles.container}>
          <Pressable
            style={[
              styles.clockData,
              {
                backgroundColor:
                  // !locationOn || !locationPermission
                  //   ? Colors.disabled
                  //   :
                  attendance?.late ? "#feedaf" : "#daecfc",
              },
            ]}
            onPress={shiftValue || !clockIn ? handleToClock : null}
            // disabled={!locationOn || !locationPermission}
          >
            <Text
              style={{
                color:
                  // !locationOn || !locationPermission
                  //   ? Colors.fontGrey
                  //   :
                  attendance?.late ? "#fdc500" : Colors.primary,
              }}
            >
              Clock-in
            </Text>
            <Text
              style={{
                fontWeight: "500",
                color:
                  // !locationOn || !locationPermission
                  //   ? Colors.fontGrey
                  //   :
                  attendance?.late ? "#fdc500" : Colors.primary,
                textAlign: "center",
              }}
            >
              {attendance?.time_in ? attendance?.time_in || attendance?.time_in : "-:-"}
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.clockData,
              {
                backgroundColor:
                  shift && !clockIn
                    ? Colors.disabled
                    : attendance?.early
                    ? "#feedaf"
                    : "#daecfc",
              },
            ]}
            onPress={clockIn && handleToClock}
          >
            <Text
              style={{
                color:
                  shift && !clockIn
                    ? Colors.fontGrey
                    : attendance?.early
                    ? "#fdc500"
                    : Colors.primary,
              }}
            >
              Clock-out
            </Text>
            <Text
              style={{
                fontWeight: "500",
                color:
                  shift && !clockIn
                    ? Colors.fontGrey
                    : attendance?.early
                    ? "#fdc500"
                    : Colors.primary,
                textAlign: "center",
              }}
            >
              {attendance?.time_out
                ? attendance?.time_out || attendance?.time_out
                : "-:-"}
            </Text>
          </Pressable>
        </View>
        {(!shift || !slide) && (
          <Animated.View
            style={[
              styles.slideTrack,
              { backgroundColor: renderBackgroundSlideTrack },
              rContainerStyle,
            ]}
          >
            {location === null || !locationOn ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{ color: Colors.fontLight, fontSize: 16, fontWeight: "500" }}
                >
                  Location not found
                </Text>
              </View>
            ) : (
              <PanGestureHandler onGestureEvent={panGesture}>
                <Animated.View
                  style={[
                    rTaskContainerStyle,
                    styles.slideArrow,
                    { backgroundColor: renderBackgroundSlideArrow },
                  ]}
                >
                  <AnimatedIcon
                    name="chevron-right"
                    size={50}
                    color={modalIsOpen ? Colors.primary : Colors.iconLight}
                  />
                </Animated.View>
              </PanGestureHandler>
            )}

            <View style={[styles.slideWording, { width: "100%" }]}>
              {modalIsOpen ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <ActivityIndicator color={Colors.iconLight} />
                  <Text
                    style={{ color: Colors.fontLight, fontSize: 16, fontWeight: "500" }}
                  >
                    Processing
                  </Text>
                </View>
              ) : (
                <AnimatedText
                  style={[
                    textContainerStyle,
                    { fontSize: 16, fontWeight: "500", color: renderColorSlideText },
                  ]}
                >
                  {renderSlideText}
                </AnimatedText>
              )}
            </View>
          </Animated.View>
<<<<<<< HEAD
        )}
      </> */}
=======
        </>
      )}
>>>>>>> a33df56f (feat: shift atttendance)
=======

      <View style={styles.container}>
        <Pressable
          style={[
            styles.clockData,
            {
              backgroundColor:
                // !locationOn || !locationPermission
                //   ? Colors.disabled
                //   :
                attendance?.late ? "#feedaf" : "#daecfc",
            },
          ]}
          onPress={!clockIn && handleToClock}
          // disabled={!locationOn || !locationPermission}
        >
          <Text
            style={{
              color:
                // !locationOn || !locationPermission
                //   ? Colors.fontGrey
                //   :
                attendance?.late ? "#fdc500" : Colors.primary,
            }}
          >
            Clock-in
          </Text>
          <Text
            style={{
              fontWeight: "500",
              color:
                // !locationOn || !locationPermission
                //   ? Colors.fontGrey
                //   :
                attendance?.late ? "#fdc500" : Colors.primary,
              textAlign: "center",
            }}
          >
            {attendance?.time_in ? attendance?.time_in || attendance?.time_in : "-:-"}
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.clockData,
            {
              backgroundColor: !clockIn
                ? Colors.disabled
                : attendance?.early
                ? "#feedaf"
                : "#daecfc",
            },
          ]}
          onPress={clockIn && handleToClock}
        >
          <Text
            style={{
              color: !clockIn
                ? Colors.fontGrey
                : attendance?.early
                ? "#fdc500"
                : Colors.primary,
            }}
          >
            Clock-out
          </Text>
          <Text
            style={{
              fontWeight: "500",
              color: !clockIn
                ? Colors.fontGrey
                : attendance?.early
                ? "#fdc500"
                : Colors.primary,
              textAlign: "center",
            }}
          >
            {attendance?.time_out ? attendance?.time_out || attendance?.time_out : "-:-"}
          </Text>
        </Pressable>
      </View>
<<<<<<< HEAD
      {/* <Animated.View
        style={[
          styles.slideTrack,
          {
            backgroundColor:
              location === null ? "#FF7F7F" : modalIsOpen ? Colors.primary : "#87878721",
          },
          rContainerStyle,
        ]}
      >
        {location === null || !locationOn ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                color: Colors.fontLight,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Location not found
            </Text>
          </View>
        ) : (
          <PanGestureHandler onGestureEvent={panGesture}>
            <Animated.View
              style={[
                rTaskContainerStyle,
                styles.slideArrow,
                {
                  backgroundColor:
                    clockIn && !minimumDurationReached
                      ? Colors.danger
                      : modalIsOpen
                      ? Colors.secondary
                      : Colors.primary,
                },
              ]}
            >
              <AnimatedIcon
                name="chevron-right"
                size={50}
                color={modalIsOpen ? Colors.primary : Colors.iconLight}
              />
            </Animated.View>
          </PanGestureHandler>
        )}

        <View style={[styles.slideWording, { width: "100%" }]}>
          {modalIsOpen ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <ActivityIndicator color={Colors.iconLight} />
              <Text
                style={{
                  color: Colors.fontLight,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Processing
              </Text>
            </View>
          ) : (
            <AnimatedText
              style={[
                textContainerStyle,
                {
                  fontSize: 16,
                  fontWeight: "500",
                  color:
                    clockIn && !minimumDurationReached
                      ? Colors.fontLight
                      : !modalIsOpen
                      ? Colors.fontLight
                      : Colors.primary,
                },
              ]}
            >
              {location === null
                ? null
                : (modalIsOpen && !location) || (modalIsOpen && !locationOn)
                ? `${!attendance?.time_out ? "Clock-in" : "Clock-out"} failed!`
                : `Slide to ${!attendance?.time_in ? "Clock-in" : "Clock-out"}`}
            </AnimatedText>
          )}
        </View>
      </Animated.View> */}
>>>>>>> bfa7e57c (fix: map)
=======
>>>>>>> 9d6a7cd4 (fix: dashboard tribe, coin)
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
    width: "48%",
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
<<<<<<< HEAD
<<<<<<< HEAD
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    // flex: 1,
=======
    // width: "40%",
=======
>>>>>>> 9d6a7cd4 (fix: dashboard tribe, coin)
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
>>>>>>> 066d8525 (feat: map view)
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
