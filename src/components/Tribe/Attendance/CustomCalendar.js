<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Colors } from "../../../styles/Color";
import { useAttendance } from "./hooks/useAttendance";

const { width } = Dimensions.get("window");
const DAY_BOX_MARGIN = 2;
const DAYS_IN_WEEK = 7;
const DAY_BOX_SIZE = (width - DAY_BOX_MARGIN * (DAYS_IN_WEEK + 1)) / DAYS_IN_WEEK;
=======
import { useRef, useState } from "react";
=======
>>>>>>> d64fa295 (fix: calendar)
import dayjs from "dayjs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { View, Text, Button, TouchableOpacity, Animated, Easing } from "react-native";
import styles from "./Attendance.styles";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 6d058444 (feat: attendance)
=======
import { useAttendance } from "./useAttendance";
>>>>>>> d64fa295 (fix: calendar)
=======
import { useAttendance } from "./hooks/useAttendance";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";
>>>>>>> 44e387b9 (fix: calendar)

const CustomCalendar = ({
  toggleDate,
  updateAttendanceCheckAccess,
  allGood,
  reportRequired,
  submittedReport,
  dayOff,
  sick,
  filter,
  items,
  currentDate,
  handleSwitchMonth,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 44e387b9 (fix: calendar)
  leave,
  beginPeriod,
  endPeriod,
}) => {
  const {
    currentMonth,
    setCurrentMonth,
    direction,
    setDirection,
    beginDate,
    days,
    weekdays,
    firstDayWeekIndex,
    slideAnim,
  } = useAttendance();
=======
}) => {
<<<<<<< HEAD
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0);

  const slideAnim = useRef(new Animated.Value(0)).current;
>>>>>>> 6d058444 (feat: attendance)
=======
  const {
    currentMonth,
    setCurrentMonth,
    direction,
    setDirection,
    beginDate,
    days,
    weekdays,
    firstDayWeekIndex,
    slideAnim,
  } = useAttendance();
>>>>>>> d64fa295 (fix: calendar)

  const getCustomRange = (month) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
<<<<<<< HEAD
    const startDate = new Date(year, monthIndex - 1, 22);
    const endDate = new Date(year, monthIndex, 21);
=======

    const startDate = new Date(year, monthIndex - 1, 22); // 22 of previous month
    const endDate = new Date(year, monthIndex, 21); // 21 of current month
>>>>>>> 6d058444 (feat: attendance)
    return { startDate, endDate };
  };

  const { startDate, endDate } = getCustomRange(currentMonth);

<<<<<<< HEAD
<<<<<<< HEAD
  const animateSlide = (newMonth, dir) => {
    setDirection(dir);
    Animated.timing(slideAnim, {
      toValue: dir * -width,
=======
  const generateDays = () => {
    const days = [];
    let current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

=======
>>>>>>> d64fa295 (fix: calendar)
  const animateSlide = (newMonth, dir) => {
    setDirection(dir);
    Animated.timing(slideAnim, {
      toValue: dir * -300,
>>>>>>> 6d058444 (feat: attendance)
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentMonth(newMonth);
<<<<<<< HEAD
      const { endDate } = getCustomRange(newMonth);
=======

      const { endDate } = getCustomRange(newMonth);

>>>>>>> 6d058444 (feat: attendance)
      if (updateAttendanceCheckAccess) {
        handleSwitchMonth({
          month: dayjs(endDate).format("M"),
          year: dayjs(endDate).format("YYYY"),
        });
      }
<<<<<<< HEAD
      slideAnim.setValue(dir * width);
=======

      slideAnim.setValue(dir * 300);
>>>>>>> 6d058444 (feat: attendance)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePrev = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
<<<<<<< HEAD
<<<<<<< HEAD
    animateSlide(newMonth, -1);
  };

  const isNextDisabled = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const { startDate: nextStartDate } = getCustomRange(nextMonth);
    return nextStartDate > beginDate;
  };

  const handleNext = () => {
    if (isNextDisabled()) return;
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    animateSlide(newMonth, 1);
  };

  const getDayStyle = (dateKey) => {
    if (!items || !items[dateKey]) {
      return { backgroundColor: Colors.secondary, textColor: Colors.fontDark };
    }

    const events = items[dateKey];
    if (!events?.length) {
      return { backgroundColor: Colors.secondary, textColor: Colors.fontDark };
    }
=======
    // setCurrentMonth(newMonth);
=======
    setCurrentMonth(newMonth);
>>>>>>> d64fa295 (fix: calendar)
    animateSlide(newMonth, -1);
  };

  const isNextDisabled = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const { startDate: nextStartDate } = getCustomRange(nextMonth);
    return nextStartDate > beginDate;
  };

  const handleNext = () => {
    if (isNextDisabled()) return;
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
    animateSlide(newMonth, 1);
  };

  const getDayStyle = (dateKey) => {
    if (!items || !items[dateKey]) {
      return { backgroundColor: Colors.secondary, textColor: Colors.fontDark };
    }

    const events = items[dateKey];
    if (!events || events?.length === 0)
      return {
        backgroundColor: Colors.secondary,
        textColor: Colors.fontDark,
      };
>>>>>>> 6d058444 (feat: attendance)

    let backgroundColor = allGood.color;
    let textColor = allGood.textColor;

<<<<<<< HEAD
    events.forEach((event) => {
      const {
        attendanceType,
        attendanceReason,
        dayType,
        confirmation,
        leaveRequest,
        approvalUnattendance,
        approvalUnattendanceStatus,
        date,
        timeIn,
        timeOut,
        late,
        early,
        earlyReason,
        approvalLate,
        approvalLateStatus,
        approvalEarly,
        approvalEarlyStatus,
        approvalClockOut,
        approvalClockOutStatus,
      } = event;

      if (confirmation) {
        backgroundColor = allGood.color;
        textColor = allGood.textColor;
        return;
      }
      if (attendanceType === "Absent" && date === dayjs().format("YYYY-MM-DD")) {
        backgroundColor = reportRequired.color;
        textColor = reportRequired.textColor;
      }
      if (
        dayType === "Day Off" ||
        (dayType === "Holiday" && !leaveRequest) ||
        dayjs(date).day() === 0 ||
        dayjs(date).day() === 6
      ) {
        backgroundColor = dayOff.color;
        textColor = dayOff.textColor;
        return;
      }
      if (!dayType) {
        backgroundColor = reportRequired.color;
        textColor = reportRequired.textColor;
        return;
      } else if (
        dayType === "Work Day" &&
        (attendanceType === "Attend" || attendanceType === "Present")
      ) {
        if (timeIn && timeOut) {
          if (!late && !early) {
            backgroundColor = allGood.color;
            textColor = allGood.textColor;
            return;
          }
          if (late) {
            backgroundColor = submittedReport.color;
            textColor = submittedReport.textColor;

            if (approvalLate && !approvalLateStatus) {
              backgroundColor = reportRequired.color;
              textColor = reportRequired.textColor;
              return;
            } else if (approvalLate && approvalLateStatus) {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            } else if (!approvalLate) {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            }

            if (early && !earlyReason) {
              backgroundColor = reportRequired.color;
              textColor = reportRequired.textColor;
              return;
            } else {
              if (approvalEarly && !approvalEarlyStatus) {
                backgroundColor = reportRequired.color;
                textColor = reportRequired.textColor;
                return;
              } else if (approvalEarly && approvalEarlyStatus) {
                backgroundColor = submittedReport.color;
                textColor = submittedReport.textColor;
                return;
              } else if (!approvalEarly) {
                backgroundColor = submittedReport.color;
                textColor = submittedReport.textColor;
                return;
              }
            }
            return;
          }
        }
        if (timeIn && !timeOut) {
          if (!late && !early) {
            backgroundColor = allGood.color;
            textColor = allGood.textColor;
            return;
          }
          if (!attendanceReason) {
            backgroundColor = reportRequired.color;
            textColor = reportRequired.textColor;
            return;
          } else {
            if (approvalClockOut && !approvalClockOutStatus) {
              backgroundColor = reportRequired.color;
              textColor = reportRequired.textColor;
              return;
            } else if (approvalClockOut && approvalClockOutStatus) {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            } else if (!approvalClockOut) {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            }
          }
        }
      }
      if (
        dayType === "Work Day" ||
        attendanceType !== "Attend" ||
        attendanceType !== "Present"
      ) {
        if (attendanceType === "Leave" || leaveRequest) {
          backgroundColor = leave.color;
          textColor = leave.textColor;
          return;
        } else {
          if (attendanceType !== "Absent") {
            if (approvalUnattendance && !approvalUnattendanceStatus) {
              backgroundColor = reportRequired.color;
              textColor = reportRequired.textColor;
              return;
            } else {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            }
          } else if (attendanceType === "Sick") {
            if (approvalUnattendance && !approvalUnattendanceStatus) {
              backgroundColor = reportRequired.color;
              textColor = reportRequired.textColor;
              return;
            } else {
              backgroundColor = sick.color;
              textColor = sick.textColor;
              return;
            }
          } else {
            if (attendanceReason) {
              backgroundColor = submittedReport.color;
              textColor = submittedReport.textColor;
              return;
            } else if (date !== dayjs().format("YYYY-MM-DD")) {
              backgroundColor = reportRequired.color;
              textColor = reportRequired.textColor;
              return;
            }
          }
        }
=======
    events?.forEach((event) => {
      const {
        attendanceType,
        dayType,
        early,
        late,
        confirmation,
        earlyReason,
        lateReason,
        attendanceReason,
        leaveRequest,
        dateData,
      } = event;

      if (confirmation) {
        backgroundColor = allGood.color;
        textColor = allGood.textColor;
      } else if (dayType === "Day Off" || (dayType === "Holiday" && !leaveRequest)) {
        // hari day off atau libur berdasarkan data holiday
        backgroundColor = dayOff.color;
        textColor = dayOff.textColor;
      } else if (dayType === "Work Day" && attendanceType === "Sick") {
        // hari kerja tapi sakit
        backgroundColor = sick.color;
        textColor = sick.textColor;
      } else if (
        dayType === "Work Day" &&
        (attendanceType === "Attend" || attendanceType === "Present") &&
        !late &&
        !early
      ) {
        // hadir tidak late tidak early
        backgroundColor = allGood.color;
        textColor = allGood.textColor;
      } else if ((dayType === "Work Day" || dayType === "Holiday") && leaveRequest) {
        // hari kerja atau libur tapi ada permohonan cuti
        backgroundColor = leave.color;
        textColor = leave.textColor;
      } else if (
        (dayType === "Work Day" &&
          // && attendanceType === "Attend"
          late) ||
        (early && earlyReason)
      ) {
        // hadir terlambat atau pulang awal dengan alasan
        backgroundColor = submittedReport.color;
        textColor = submittedReport.textColor;
      } else if (
        (dayType === "Work Day" &&
          (attendanceType === "Attend" || attendanceType === "Present") &&
          late &&
          !lateReason) ||
        (early && !earlyReason) ||
        dayjs(dayjs().format("YYYY-MM-DD")).isAfter(dateData)
      ) {
        // hadir terlambat atau pulang awal tanpa alasan
        backgroundColor = reportRequired.color;
        textColor = reportRequired.textColor;
      } else if (
        dayType === "Work Day" &&
        (attendanceType !== "Attend" || attendanceType !== "Present") &&
        attendanceReason
      ) {
        // tidak hadir dengan alasan
        backgroundColor = submittedReport.color;
        textColor = submittedReport.textColor;
<<<<<<< HEAD
      } else if (attendanceType === "Sick" && attendanceReason) {
        backgroundColor = sick.color;
        textColor = sick.textColor;
>>>>>>> 6d058444 (feat: attendance)
=======
      } else if (
        dayType === "Work Day" &&
        (attendanceType !== "Attend" || attendanceType !== "Present") &&
        !attendanceReason
      ) {
        // tidak hadir tanpa alasan
        backgroundColor = reportRequired.color;
        textColor = reportRequired.textColor;
>>>>>>> 44e387b9 (fix: calendar)
      }
    });

    return { backgroundColor, textColor };
  };

  return (
    <View style={styles.calendarContainer}>
<<<<<<< HEAD
<<<<<<< HEAD
      {/* Header Info */}
      <View style={styles.headerInfo}>
        <Text style={styles.headerText}>{`Period : ${beginPeriod} - ${endPeriod}`}</Text>
        <Text style={styles.headerText}>{`Auto Confirm : ${endPeriod}`}</Text>
      </View>

      {/* Month Selector */}
      <View style={styles.buttonRow}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={22}
          color={Colors.iconDark}
          onPress={handlePrev}
        />
        <Text style={styles.calendarTitle}>
          {endDate.toLocaleString("default", { month: "long" })} {endDate.getFullYear()}
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={isNextDisabled() ? Colors.iconGrey : Colors.iconDark}
          onPress={handleNext}
        />
      </View>

      {/* Weekday Header */}
      <View style={styles.weekdayRow}>
        {weekdays.map((day, i) => (
          <View key={i} style={styles.weekdayBox}>
            <Text style={styles.weekday}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
=======
      <Text style={styles.calendarTitle}>
        {endDate.toLocaleString("default", { month: "long" })} {endDate.getFullYear()}
      </Text>

=======
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[TextProps, { fontSize: 12, fontWeight: "bold" }]}
        >{`Period : ${beginPeriod} - ${endPeriod}`}</Text>
        <Text
          style={[TextProps, { fontSize: 12, fontWeight: "bold" }]}
        >{`Auto Confirm : ${endPeriod}`}</Text>
      </View>
>>>>>>> 44e387b9 (fix: calendar)
      <View style={styles.buttonRow}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={20}
          color={Colors.iconDark}
          onPress={handlePrev}
          disabled={null}
        />
        <Text style={styles.calendarTitle}>
          {endDate.toLocaleString("default", { month: "long" })} {endDate.getFullYear()}
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={isNextDisabled() ? Colors.iconGrey : Colors.iconDark}
          onPress={handleNext}
          disabled={isNextDisabled()}
        />
      </View>

      <View style={styles.weekdayRow}>
        {weekdays.map((day, index) => (
          <Text key={index} style={styles.weekday}>
            {day}
          </Text>
        ))}
      </View>

>>>>>>> 6d058444 (feat: attendance)
      <Animated.View style={[styles.grid, { transform: [{ translateX: slideAnim }] }]}>
        {Array.from({ length: firstDayWeekIndex }).map((_, index) => (
          <View key={`empty-${index}`} style={styles.dayBox} />
        ))}
        {days.map((day) => {
          const dateKey = dayjs(day).format("YYYY-MM-DD");
<<<<<<< HEAD
          const { backgroundColor, textColor } = getDayStyle(dateKey);
          return (
            <TouchableOpacity
              key={dateKey}
              style={[styles.dayBox, { backgroundColor }]}
              onPress={() => toggleDate({ dateString: dateKey })}
            >
              <Text style={[styles.dayText, { color: textColor }]}>{day.getDate()}</Text>
=======
          const { backgroundColor, textColor } = getDayStyle(dateKey, day);

          const today = new Date();
          const isToday =
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear();
          return (
            <TouchableOpacity
              key={`${dateKey}`}
              style={[
                styles.dayBox,
                { backgroundColor: backgroundColor || Colors.secondary },
                // isToday && styles.todayBox,
              ]}
              onPress={() => toggleDate({ dateString: dateKey })}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: textColor },
                  // isToday && styles.todayText,
                ]}
              >
                {day.getDate()}
              </Text>
>>>>>>> 6d058444 (feat: attendance)
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default CustomCalendar;
<<<<<<< HEAD

const styles = StyleSheet.create({
  calendarContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginVertical: 14,
  },
  headerInfo: {
    alignItems: "center",
    marginBottom: 6,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.fontDark,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 6,
  },
  calendarTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.fontDark,
    textAlign: "center",
  },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 4,
  },
  weekdayBox: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weekday: {
    fontSize: 11,
    fontWeight: "bold",
    color: Colors.fontDark,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  dayBox: {
    flexBasis: `${100 / 7}%`,
    aspectRatio: 1,
    borderRadius: 999, // make circle
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  dayText: {
    fontSize: Platform.OS === "android" ? 12 : 13,
    fontWeight: "600",
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
=======
>>>>>>> 6d058444 (feat: attendance)
