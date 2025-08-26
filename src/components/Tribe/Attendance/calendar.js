import { Fragment } from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

export const renderCalendarWithMultiDotMarking = (
  items,
  updateAttendanceCheckAccess,
  toggleDate,
  currentDate,
  handleSwitchMonth,
  allGood,
  reportRequired,
  submittedReport,
  dayOff,
  sick
) => {
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
        } = event;

        if (attendanceType === "Leave") {
          backgroundColor = dayOff.color;
          textColor = dayOff.textColor;
        } else if (
          (early && !earlyReason && !confirmation) ||
          (late && !lateReason && !confirmation) ||
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          ((attendanceType === "Alpa" || attendanceType === "Absent") &&
            !attendanceReason &&
            date !== currentDate) ||
=======
          (attendanceType === "Alpa" && !attendanceReason && date !== currentDate) ||
>>>>>>> 5ff79603 (fix:)
=======
          ((attendanceType === "Alpa" || attendanceType === "Absent") &&
            !attendanceReason &&
            date !== currentDate) ||
>>>>>>> 625b7c51 (fix: calendar)
=======
          ((attendanceType === "Alpa" || attendanceType === "Absent") &&
            !attendanceReason &&
            date !== currentDate) ||
>>>>>>> 859eea89 (first commit)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          ((attendanceType === "Alpa" || attendanceType === "Absent") &&
            attendanceReason) ||
=======
          (attendanceType === "Alpa" && attendanceReason) ||
>>>>>>> 5ff79603 (fix:)
=======
          ((attendanceType === "Alpa" || attendanceType === "Absent") &&
            attendanceReason) ||
>>>>>>> 625b7c51 (fix: calendar)
=======
          ((attendanceType === "Alpa" || attendanceType === "Absent") &&
            attendanceReason) ||
>>>>>>> 859eea89 (first commit)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            (attendanceType === "Alpa" || attendanceType === "Absent") &&
            !timeIn) ||
          (!confirmation &&
            dayType === "Work Day" &&
            (attendanceType === "Attend" || attendanceType === "Present") &&
=======
            attendanceType === "Alpa" &&
            !timeIn) ||
          (!confirmation &&
            dayType === "Work Day" &&
            attendanceType === "Attend" &&
>>>>>>> 5ff79603 (fix:)
=======
            (attendanceType === "Alpa" || attendanceType === "Absent") &&
            !timeIn) ||
          (!confirmation &&
            dayType === "Work Day" &&
            (attendanceType === "Attend" || attendanceType === "Present") &&
>>>>>>> 625b7c51 (fix: calendar)
=======
            (attendanceType === "Alpa" || attendanceType === "Absent") &&
            !timeIn) ||
          (!confirmation &&
            dayType === "Work Day" &&
            (attendanceType === "Attend" || attendanceType === "Present") &&
>>>>>>> 859eea89 (first commit)
            timeIn &&
            timeOut) ||
          (!confirmation &&
            dayType === "Work Day" &&
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            (attendanceType === "Attend" || attendanceType === "Present") &&
=======
            attendanceType === "Attend" &&
>>>>>>> 5ff79603 (fix:)
=======
            (attendanceType === "Attend" || attendanceType === "Present") &&
>>>>>>> 625b7c51 (fix: calendar)
=======
            (attendanceType === "Attend" || attendanceType === "Present") &&
>>>>>>> 859eea89 (first commit)
            timeIn &&
            !timeOut) ||
          (!confirmation &&
            dayType === "Work Day" &&
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            (attendanceType === "Alpa" || attendanceType === "Absent") &&
=======
            attendanceType === "Alpa" &&
>>>>>>> 5ff79603 (fix:)
=======
            (attendanceType === "Alpa" || attendanceType === "Absent") &&
>>>>>>> 625b7c51 (fix: calendar)
=======
            (attendanceType === "Alpa" || attendanceType === "Absent") &&
>>>>>>> 859eea89 (first commit)
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
