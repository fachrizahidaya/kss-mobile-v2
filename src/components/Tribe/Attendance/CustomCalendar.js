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

  const getCustomRange = (month) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const startDate = new Date(year, monthIndex - 1, 22);
    const endDate = new Date(year, monthIndex, 21);
    return { startDate, endDate };
  };

  const { startDate, endDate } = getCustomRange(currentMonth);

  const animateSlide = (newMonth, dir) => {
    setDirection(dir);
    Animated.timing(slideAnim, {
      toValue: dir * -width,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentMonth(newMonth);
      const { endDate } = getCustomRange(newMonth);
      if (updateAttendanceCheckAccess) {
        handleSwitchMonth({
          month: dayjs(endDate).format("M"),
          year: dayjs(endDate).format("YYYY"),
        });
      }
      slideAnim.setValue(dir * width);
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

    let backgroundColor = allGood.color;
    let textColor = allGood.textColor;

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
      }
    });

    return { backgroundColor, textColor };
  };

  return (
    <View style={styles.calendarContainer}>
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
      <Animated.View style={[styles.grid, { transform: [{ translateX: slideAnim }] }]}>
        {Array.from({ length: firstDayWeekIndex }).map((_, index) => (
          <View key={`empty-${index}`} style={styles.dayBox} />
        ))}
        {days.map((day) => {
          const dateKey = dayjs(day).format("YYYY-MM-DD");
          const { backgroundColor, textColor } = getDayStyle(dateKey);
          return (
            <TouchableOpacity
              key={dateKey}
              style={[styles.dayBox, { backgroundColor }]}
              onPress={() => toggleDate({ dateString: dateKey })}
            >
              <Text style={[styles.dayText, { color: textColor }]}>{day.getDate()}</Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default CustomCalendar;

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
