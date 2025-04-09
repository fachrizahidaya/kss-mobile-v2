import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import { View, Text, Platform, Dimensions, StyleSheet, Pressable } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ClockAttendance = ({ attendance, clockIn, mainSheetRef, startTime, endTime }) => {
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

  const handleToClock = () => {
    navigation.navigate("Clock");
    mainSheetRef.current?.hide();
  };

  return (
    <View style={{ gap: 20 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={[TextProps, { color: Colors.primary, fontSize: 12 }]}>
            {`${dayjs().format("DD MMM YYYY")} (${startTime}-${endTime})`}
          </Text>
        </View>

        {/* <View style={styles.content}>
            <Text style={[TextProps, { color: Colors.primary, fontSize: 12 }]}>
              Duration: {workDuration && timeIn ? workDuration : "-:-"}
            </Text>
          </View> */}
      </View>

      <View style={styles.container}>
        <Pressable
          style={[
            styles.clockData,
            { backgroundColor: attendance?.late ? "#feedaf" : "#daecfc" },
          ]}
          onPress={!clockIn && handleToClock}
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
        <Pressable
          style={[
            styles.clockData,
            { backgroundColor: attendance?.early ? "#feedaf" : "#daecfc" },
          ]}
          onPress={clockIn && handleToClock}
        >
          <Text
            style={{
              color: attendance?.early ? "#fdc500" : Colors.primary,
            }}
          >
            Clock-out
          </Text>
          <Text
            style={{
              fontWeight: "500",
              color: attendance?.early ? "#fdc500" : Colors.primary,
              textAlign: "center",
            }}
          >
            {attendance?.time_out ? attendance?.time_out || attendance?.time_out : "-:-"}
          </Text>
        </Pressable>
      </View>
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
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
