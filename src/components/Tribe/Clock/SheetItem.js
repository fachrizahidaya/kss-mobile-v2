import { useNavigation } from "@react-navigation/native";

import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
<<<<<<< HEAD
<<<<<<< HEAD
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
=======
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
>>>>>>> 43b9e6a2 (feat: overtime)

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
<<<<<<< HEAD
<<<<<<< HEAD
  locationPermission,
  attendanceModalIsopen,
  workDuration,
  shiftSelected,
  setShiftSelected,
=======
=======
  locationPermission,
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
  attendanceModalIsopen,
  workDuration,
  shiftSelected,
<<<<<<< HEAD
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
  setShiftSelected,
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
  minimumDurationReached,
  props,
  toggleNewLeaveRequestModal,
  setRequestType,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
  type,
  shifts,
  toggleClockModal,
  setErrorMessage,
  result,
  setResult,
<<<<<<< HEAD
=======
  setErrorMessage,
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
>>>>>>> eda236e3 (fix: new live session)
=======
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (item.title === "New Leave Request") {
      navigation.navigate("New Leave Request", {
        employeeId: profile?.data?.id,
        toggle: toggleNewLeaveRequestModal,
<<<<<<< HEAD
<<<<<<< HEAD
        setType: setRequestType,
=======
        setRequestType: setRequestType,
        setError: setErrorMessage,
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
        setType: setRequestType,
>>>>>>> eda236e3 (fix: new live session)
      });
    } else if (item.title === "New Reimbursement") {
      navigation.navigate("New Reimbursement");
    } else if (item.title === "New Live Session") {
      navigation.navigate("New Live Session");
<<<<<<< HEAD
    } else if (item.title === "New Work Session") {
      navigation.navigate("New Work Session");
=======
>>>>>>> 2a9d5213 (fix: tribe add new)
    }
    props.reference.current?.hide();
  };

  if (item.title !== "Clock in") {
    return (
      <Pressable style={styles.wrapper} onPress={handlePress}>
        <View style={styles.content}>
          <View style={styles.item}>
<<<<<<< HEAD
<<<<<<< HEAD
            {(
              <MaterialCommunityIcons
                name={item.icons}
                size={20}
                color={Colors.iconDark}
              />
            ) || <MaterialIcons name={item.icons} size={20} color={Colors.iconDark} />}
=======
            <MaterialCommunityIcons name={item.icons} size={20} color={Colors.iconDark} />
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
            <MaterialIcons name={item.icons} size={20} color={Colors.iconDark} />
>>>>>>> 43b9e6a2 (feat: overtime)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
          reference={selectShiftRef}
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
          shiftValue={shiftSelected}
          minimumDurationReached={minimumDurationReached}
          clockIn={attendance?.data?.time_in}
          mainSheetRef={props.reference}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
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
<<<<<<< HEAD
=======
>>>>>>> 2a9d5213 (fix: tribe add new)
=======
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
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
