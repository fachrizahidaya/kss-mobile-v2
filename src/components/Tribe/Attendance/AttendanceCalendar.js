import { Fragment, memo } from "react";
import dayjs from "dayjs";
<<<<<<< HEAD

import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
=======
>>>>>>> d3d4ef0a (fix:)

import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

import { View } from "react-native";
import AttendanceColor from "./AttendanceColor";
import { Colors } from "../../../styles/Color";
<<<<<<< HEAD

const AttendanceCalendar = ({
  items,
  updateAttendanceCheckAccess,
  toggleDate,
  currentDate,
  handleSwitchMonth,
  allGood,
  reportRequired,
  submittedReport,
  dayOff,
  sick,
  filter,
<<<<<<< HEAD
<<<<<<< HEAD
  leave,
}) => {
  const renderCalendarWithMultiDotMarking = () => {
    const markedDates = {};

    for (const date in items) {
      if (items.hasOwnProperty(date)) {
        const events = items[date];
        const customStyles = {};

        events.forEach((event) => {
          let backgroundColor = "";
          let textColor = "";
          const {
            attendanceType,
            dayType,
            early,
            late,
            confirmation,
            earlyReason,
            lateReason,
            earlyType,
            lateType,
            earlyStatus,
            lateStatus,
            attendanceReason,
            timeIn,
            timeOut,
            leaveRequest,
            dateData,
            date,
<<<<<<< HEAD
          } = event;

          if (confirmation) {
            backgroundColor = allGood.color;
            textColor = allGood.textColor;
          } else if (dayType === "Day Off" || (dayType === "Holiday" && !leaveRequest)) {
            backgroundColor = dayOff.color;
            textColor = dayOff.textColor;
          } else if (dayType === "Work Day" && attendanceType === "Sick") {
            backgroundColor = sick.color;
            textColor = sick.textColor;
          } else if (
            dayType === "Work Day" &&
            attendanceType === "Attend" &&
            !late &&
            !early
          ) {
            backgroundColor = allGood.color;
            textColor = allGood.textColor;
          } else if ((dayType === "Work Day" || dayType === "Holiday") && leaveRequest) {
            backgroundColor = leave.color;
            textColor = leave.textColor;
          } else if (
            (dayType === "Work Day" && attendanceType === "Attend" && late) ||
            (early && earlyReason)
          ) {
            backgroundColor = submittedReport.color;
            textColor = submittedReport.textColor;
          } else if (
            (dayType === "Work Day" &&
              attendanceType === "Attend" &&
              late &&
              lateReason) ||
            (early && !earlyReason) ||
            dayjs(dayjs().format("YYYY-MM-DD")).isAfter(date)
          ) {
            backgroundColor = reportRequired.color;
            textColor = reportRequired.textColor;
          } else if (
            dayType === "Work Day" &&
            attendanceType !== "Attend" &&
            attendanceReason
          ) {
            backgroundColor = submittedReport.color;
            textColor = submittedReport.textColor;
          } else if (
            dayType === "Work Day" &&
            attendanceType !== "Attend" &&
            !attendanceReason
          ) {
            backgroundColor = reportRequired.color;
            textColor = reportRequired.textColor;
          }

          if (attendanceType === "Leave") {
            backgroundColor = dayOff.color;
            textColor = dayOff.textColor;
          } else if (
            (early && !earlyReason && !confirmation) ||
            (late && !lateReason && !confirmation) ||
            (attendanceType === "Alpa" && !attendanceReason && date !== currentDate) ||
            attendanceType === "Leave" ||
            dayType === "Weekend" ||
            dayType === "Holiday" ||
            dayType === "Day Off"
          ) {
            backgroundColor = reportRequired.color;
            textColor = reportRequired.textColor;
          } else if (
            (((early && earlyReason) || (late && lateReason)) && !confirmation) ||
            (late && lateReason && earlyType && !earlyReason && !earlyStatus) ||
            (early && earlyReason && lateType && !lateReason && !lateStatus) ||
            (attendanceType === "Permit" && attendanceReason) ||
            (attendanceType === "Alpa" && attendanceReason) ||
            (attendanceType === "Other" &&
              attendanceReason &&
              !confirmation &&
              date !== currentDate)
          ) {
            backgroundColor = submittedReport.color;
            textColor = submittedReport.textColor;
          } else if (attendanceType === "Sick" && attendanceReason) {
            backgroundColor = sick.color;
            textColor = sick.textColor;
          } else if (
            confirmation ||
            dayType === "Work Day" ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Alpa" &&
              !timeIn) ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Attend" &&
              timeIn &&
              timeOut) ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Attend" &&
              timeIn &&
              !timeOut) ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Alpa" &&
              !timeIn &&
              !timeOut)
          ) {
            backgroundColor = allGood.color;
            textColor = allGood.textColor;
          }

          customStyles.container = {
            backgroundColor: backgroundColor,
            borderRadius: 5,
          };
          customStyles.text = {
            color: textColor,
          };
        });

        markedDates[date] = { customStyles };
      }
    }

    return (
      <Fragment>
        <Calendar
          onDayPress={updateAttendanceCheckAccess && toggleDate}
          style={styles.calendar}
          current={currentDate}
          markingType="custom"
          markedDates={markedDates}
          onMonthChange={handleSwitchMonth}
          theme={{
            arrowColor: "#000000",
            "stylesheet.calendar.header": {
              dayTextAtIndex0: { color: "#FF7272" },
              dayTextAtIndex6: { color: "#FF7272" },
            },
          }}
        />
      </Fragment>
    );
  };

  const styles = StyleSheet.create({
    calendar: { borderRadius: 10 },
  });
=======
>>>>>>> be4a15dd (chore:)

<<<<<<< HEAD
=======
const AttendanceCalendar = ({
  items,
  updateAttendanceCheckAccess,
  toggleDate,
  currentDate,
  handleSwitchMonth,
  allGood,
  reportRequired,
  submittedReport,
  dayOff,
  sick,
=======
>>>>>>> 6d058444 (feat: attendance)
=======
  leave,
>>>>>>> 44e387b9 (fix: calendar)
}) => {
  const renderCalendarWithMultiDotMarking = () => {
    const markedDates = {};

    for (const date in items) {
      if (items.hasOwnProperty(date)) {
        const events = items[date];
        const customStyles = {};

        events.forEach((event) => {
          let backgroundColor = "";
          let textColor = "";
          const {
            attendanceType,
            dayType,
            early,
            late,
            confirmation,
            earlyReason,
            lateReason,
            earlyType,
            lateType,
            earlyStatus,
            lateStatus,
            attendanceReason,
            timeIn,
            timeOut,
            leaveRequest,
            dateData,
=======
>>>>>>> 4c17aa52 (chore: adjust calendar screen from unattendance reminder)
          } = event;

          if (confirmation) {
            backgroundColor = allGood.color;
            textColor = allGood.textColor;
          } else if (dayType === "Day Off" || (dayType === "Holiday" && !leaveRequest)) {
            backgroundColor = dayOff.color;
            textColor = dayOff.textColor;
          } else if (dayType === "Work Day" && attendanceType === "Sick") {
            backgroundColor = sick.color;
            textColor = sick.textColor;
          } else if (
            dayType === "Work Day" &&
            attendanceType === "Attend" &&
            !late &&
            !early
          ) {
            backgroundColor = allGood.color;
            textColor = allGood.textColor;
          } else if ((dayType === "Work Day" || dayType === "Holiday") && leaveRequest) {
            backgroundColor = leave.color;
            textColor = leave.textColor;
          } else if (
            (dayType === "Work Day" && attendanceType === "Attend" && late) ||
            (early && earlyReason)
          ) {
            backgroundColor = submittedReport.color;
            textColor = submittedReport.textColor;
          } else if (
            (dayType === "Work Day" &&
              attendanceType === "Attend" &&
              late &&
              lateReason) ||
            (early && !earlyReason) ||
            dayjs(dayjs().format("YYYY-MM-DD")).isAfter(date)
          ) {
            backgroundColor = reportRequired.color;
            textColor = reportRequired.textColor;
          } else if (
            dayType === "Work Day" &&
            attendanceType !== "Attend" &&
            attendanceReason
          ) {
            backgroundColor = submittedReport.color;
            textColor = submittedReport.textColor;
          } else if (
            dayType === "Work Day" &&
            attendanceType !== "Attend" &&
            !attendanceReason
          ) {
            backgroundColor = reportRequired.color;
            textColor = reportRequired.textColor;
          }

          if (attendanceType === "Leave") {
            backgroundColor = dayOff.color;
            textColor = dayOff.textColor;
          } else if (
            (early && !earlyReason && !confirmation) ||
            (late && !lateReason && !confirmation) ||
            (attendanceType === "Alpa" && !attendanceReason && date !== currentDate) ||
            attendanceType === "Leave" ||
            dayType === "Weekend" ||
            dayType === "Holiday" ||
            dayType === "Day Off"
          ) {
            backgroundColor = reportRequired.color;
            textColor = reportRequired.textColor;
          } else if (
            (((early && earlyReason) || (late && lateReason)) && !confirmation) ||
            (late && lateReason && earlyType && !earlyReason && !earlyStatus) ||
            (early && earlyReason && lateType && !lateReason && !lateStatus) ||
            (attendanceType === "Permit" && attendanceReason) ||
            (attendanceType === "Alpa" && attendanceReason) ||
            (attendanceType === "Other" &&
              attendanceReason &&
              !confirmation &&
              date !== currentDate)
          ) {
            backgroundColor = submittedReport.color;
            textColor = submittedReport.textColor;
          } else if (attendanceType === "Sick" && attendanceReason) {
            backgroundColor = sick.color;
            textColor = sick.textColor;
          } else if (
            confirmation ||
            dayType === "Work Day" ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Alpa" &&
              !timeIn) ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Attend" &&
              timeIn &&
              timeOut) ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Attend" &&
              timeIn &&
              !timeOut) ||
            (!confirmation &&
              dayType === "Work Day" &&
              attendanceType === "Alpa" &&
              !timeIn &&
              !timeOut)
          ) {
            backgroundColor = allGood.color;
            textColor = allGood.textColor;
          }

          customStyles.container = {
            backgroundColor: backgroundColor,
            borderRadius: 5,
          };
          customStyles.text = {
            color: textColor,
          };
        });

        markedDates[date] = { customStyles };
      }
    }

    return (
      <Fragment>
        <Calendar
          onDayPress={updateAttendanceCheckAccess && toggleDate}
          style={styles.calendar}
          current={currentDate}
          markingType="custom"
          markedDates={markedDates}
          onMonthChange={handleSwitchMonth}
          theme={{
            arrowColor: "#000000",
            "stylesheet.calendar.header": {
              dayTextAtIndex0: { color: "#FF7272" },
              dayTextAtIndex6: { color: "#FF7272" },
            },
          }}
        />
      </Fragment>
    );
  };

  const styles = StyleSheet.create({
    calendar: { borderRadius: 10 },
  });

>>>>>>> f12fe282 (fix: attendance form)
  return (
    <View
      style={{
        backgroundColor: Colors.secondary,
        marginHorizontal: 16,
        marginVertical: 14,
        borderRadius: 10,
      }}
    >
<<<<<<< HEAD
<<<<<<< HEAD
      <Fragment>{renderCalendarWithMultiDotMarking()}</Fragment>
=======
      <Fragment>{renderCalendar()}</Fragment>
>>>>>>> be4a15dd (chore:)
=======
      <Fragment>{renderCalendarWithMultiDotMarking()}</Fragment>
>>>>>>> f12fe282 (fix: attendance form)
      <AttendanceColor />
    </View>
  );
};

export default memo(AttendanceCalendar);
