import { useNavigation } from "@react-navigation/native";

import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import ClockAttendance from "./ClockAttendance";
import { Colors } from "../../../styles/Color";

const SheetItem = ({
  item,
  profile,
  attendance,
  handleSubmit,
  location,
  locationOn,
  locationPermission,
  attendanceModalIsopen,
  workDuration,
  shiftSelected,
  setShiftSelected,
  minimumDurationReached,
  props,
  toggleNewLeaveRequestModal,
  setRequestType,
  type,
  shifts,
  toggleClockModal,
  setErrorMessage,
  result,
  setResult,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (item.title === "New Leave Request") {
      navigation.navigate("New Leave Request", {
        employeeId: profile?.data?.id,
        toggle: toggleNewLeaveRequestModal,
        setType: setRequestType,
      });
    } else if (item.title === "New Reimbursement") {
      navigation.navigate("New Reimbursement");
    } else if (item.title === "New Live Session") {
      navigation.navigate("New Live Session");
    }
    props.reference.current?.hide();
  };

  if (item.title !== "Clock in") {
    return (
      <Pressable style={styles.wrapper} onPress={handlePress}>
        <View style={styles.content}>
          <View style={styles.item}>
            <MaterialCommunityIcons name={item.icons} size={20} color={Colors.iconDark} />
          </View>
          <Text style={[{ fontSize: 14 }, TextProps]}>{item.title}</Text>
        </View>
      </Pressable>
    );
  } else if (attendance?.data) {
    return (
      <Pressable style={styles.wrapper}>
        <ClockAttendance
          attendance={attendance?.data}
          onClock={handleSubmit}
          location={location}
          locationOn={locationOn}
          modalIsOpen={attendanceModalIsopen}
          workDuration={workDuration}
          timeIn={attendance?.data?.time_in}
          shiftValue={shiftSelected}
          minimumDurationReached={minimumDurationReached}
          clockIn={attendance?.data?.time_in}
          mainSheetRef={props.reference}
          startTime={attendance?.data?.on_duty}
          endTime={attendance?.data?.off_duty}
          locationPermission={locationPermission}
          type={type}
          shifts={shifts}
          handleChange={setShiftSelected}
          toggleClockModal={toggleClockModal}
          setRequestType={setRequestType}
          setErrorMessage={setErrorMessage}
          result={result}
          setResult={setResult}
        />
      </Pressable>
    );
  } else {
    return null;
  }
};

export default SheetItem;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
  },
  content: { flexDirection: "row", alignItems: "center", gap: 21 },
  item: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 5,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
